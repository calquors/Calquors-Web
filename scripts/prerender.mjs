// Static SSR: after `vite build`, render every route to its own HTML file so
// search engines and link previews get the full page — content, title,
// description, canonical and JSON-LD — without running JavaScript. Also writes
// sitemap.xml from the same route list, and a noindex 404.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, PAGE_SEO, seoFor, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function setTag(html, pattern, attr, value) {
  const re = new RegExp(`(<${pattern}[^>]*?${attr}=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`Missing tag in index.html: ${pattern}`)
  return html.replace(re, `$1${esc(value)}$2`)
}

function page(route, m) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)

  html = setTag(html, 'meta name="description"', 'content', m.description)
  html = setTag(html, 'link rel="canonical"', 'href', m.canonical)
  html = setTag(html, 'meta property="og:url"', 'content', m.canonical)
  html = setTag(html, 'meta property="og:title"', 'content', m.title)
  html = setTag(html, 'meta property="og:description"', 'content', m.description)
  html = setTag(html, 'meta name="twitter:url"', 'content', m.canonical)
  html = setTag(html, 'meta name="twitter:title"', 'content', m.title)
  html = setTag(html, 'meta name="twitter:description"', 'content', m.description)

  if (m.notFound) {
    html = setTag(html, 'meta name="robots"', 'content', 'noindex, follow')
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, '')
  }
  if (m.jsonld) {
    const json = JSON.stringify(m.jsonld).replace(/</g, '\\u003c')
    html = html.replace('</head>', `  <script type="application/ld+json" id="route-jsonld">${json}</script>\n  </head>`)
  }
  // Only the home page shows the video hero: preload its poster for a fast LCP.
  if (route !== '/') {
    html = html.replace(/\s*<link rel="preload" as="image"[^>]*hero[^>]*>/g, '')
  }
  return html
}

const routes = Object.keys(PAGE_SEO)
for (const route of routes) {
  // /work → dist/work.html, /work/klyq → dist/work/klyq.html. Static hosts
  // (Vercel, Netlify, Cloudflare Pages, GitHub Pages, `vite preview`) serve
  // these at the clean URLs.
  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, page(route, seoFor(route)))
  console.log(`prerendered ${route} → ${path.relative(root, out)}`)
}

fs.writeFileSync(path.join(dist, '404.html'), page('/404', seoFor('/404')))
console.log('prerendered 404 → dist/404.html')

// Sitemap from the same route list, so new pages are never forgotten.
const today = new Date().toISOString().slice(0, 10)
const priority = (r) => r === '/' ? '1.0' : r === '/company' || r === '/work' ? '0.9' : r.startsWith('/work/') ? '0.8' : '0.7'
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(r)}</priority>${r === '/' ? `
    <image:image><image:loc>${SITE_URL}/og-image.jpg</image:loc></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log(`sitemap.xml → ${routes.length} URLs`)

fs.rmSync(ssrDir, { recursive: true, force: true })
