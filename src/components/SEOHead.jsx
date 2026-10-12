import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoFor } from '../seo'

// Keeps <head> in sync on client-side navigation. The first load of every page
// already has correct tags baked in by scripts/prerender.mjs.
function setMeta(selector, value) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value)
}

export default function SEOHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const m = seoFor(pathname)
    document.title = m.title
    setMeta('meta[name="description"]', m.description)
    setMeta('link[rel="canonical"]', m.canonical)
    setMeta('meta[property="og:title"]', m.title)
    setMeta('meta[property="og:description"]', m.description)
    setMeta('meta[property="og:url"]', m.canonical)
    setMeta('meta[name="twitter:title"]', m.title)
    setMeta('meta[name="twitter:description"]', m.description)

    // Per-page structured data and robots, matching what the build wrote.
    let ld = document.getElementById('route-jsonld')
    if (m.jsonld) {
      if (!ld) {
        ld = document.createElement('script')
        ld.type = 'application/ld+json'
        ld.id = 'route-jsonld'
        document.head.appendChild(ld)
      }
      ld.textContent = JSON.stringify(m.jsonld)
    } else if (ld) {
      ld.remove()
    }
    setMeta('meta[name="robots"]', m.notFound
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  }, [pathname])

  return null
}
