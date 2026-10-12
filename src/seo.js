// Single source of truth for per-page SEO. Used at runtime by <SEOHead/> and at
// build time by scripts/prerender.mjs, which writes a static HTML file — with
// title, description, canonical and JSON-LD — for every route listed here.
import { COMPANY } from './data/site'
import { PROJECTS } from './data/projects'
import { CASE_STUDIES } from './data/caseStudies'
import { COMPANY_FAQ } from './data/company'

export const SITE_URL = 'https://calquors.com'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const ORG_ID = `${SITE_URL}/#organization`

const url = (path) => `${SITE_URL}${path}`

function breadcrumbs(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: url(c.path),
    })),
  }
}

function productSchema(p) {
  const cs = CASE_STUDIES[p.slug] || {}
  const web = p.links.find(l => l.kind === 'web')
  const stores = p.links.filter(l => l.kind !== 'web').map(l => l.url)
  if (cs.schemaType === 'Organization') {
    return {
      '@type': 'Organization',
      name: p.name,
      url: web ? web.url : url(`/work/${p.slug}`),
      description: cs.seoDescription,
      parentOrganization: { '@id': ORG_ID },
    }
  }
  return {
    '@type': cs.schemaType || 'SoftwareApplication',
    name: p.name,
    url: web ? web.url : stores[0],
    ...(stores.length ? { sameAs: stores } : {}),
    applicationCategory: cs.category,
    operatingSystem: cs.os,
    description: cs.seoDescription,
    ...(p.logo ? { image: url(p.logo) } : {}),
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
  }
}

const STATIC_PAGES = {
  '/': {
    title: 'Calquors — Product Studio for Apps & Web Platforms | Calquors Private Limited',
    description: `Calquors (Calquors Private Limited) is a product studio in India that designs, builds and ships apps and web platforms. Makers of OmegleVC, Klyq, Revfit and Rivelo Labs.`,
    schema: [
      {
        '@type': 'ItemList',
        name: 'Products by Calquors Private Limited',
        itemListElement: PROJECTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: url(`/work/${p.slug}`),
          name: p.name,
        })),
      },
    ],
  },
  '/company': {
    title: 'Calquors Private Limited (Calquors Pvt Ltd) — Company Profile',
    description: `Calquors Private Limited (Calquors Pvt Ltd) is a product studio in India. Company profile, products, contact details and FAQs.`,
    crumbs: [{ name: 'Company', path: '/company' }],
    schema: [
      {
        '@type': 'AboutPage',
        url: url('/company'),
        name: 'About Calquors Private Limited',
        about: { '@id': ORG_ID },
      },
      {
        '@type': 'FAQPage',
        mainEntity: COMPANY_FAQ.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  },
  '/work': {
    title: 'Work — OmegleVC, Klyq, Revfit & Rivelo Labs | Calquors',
    description: 'Live products built by Calquors Private Limited: OmegleVC, random and group video chat with 3,550+ registered users; Klyq on Google Play; Revfit for iOS; and Rivelo Labs.',
    crumbs: [{ name: 'Work', path: '/work' }],
  },
  '/services': {
    title: 'Services — Mobile App, Web & Software Development | Calquors',
    description: 'Native iOS and Android apps, web platforms, backends and APIs, and product design — scoped, built and shipped by one studio team at Calquors.',
    crumbs: [{ name: 'Services', path: '/services' }],
  },
  '/studio': {
    title: 'About the Studio — How Calquors Builds Products',
    description: `Calquors is a product studio based in India. We build and run our own products — OmegleVC, Klyq, Revfit and Rivelo Labs — alongside client work.`,
    crumbs: [{ name: 'Studio', path: '/studio' }],
  },
  '/contact': {
    title: 'Contact Calquors Private Limited — Start a Project',
    description: `Contact Calquors Private Limited. Email ${COMPANY.email} — we reply within one business day with a clear scope, timeline and fixed quote.`,
    crumbs: [{ name: 'Contact', path: '/contact' }],
    schema: [
      {
        '@type': 'ContactPage',
        url: url('/contact'),
        name: 'Contact Calquors Private Limited',
        about: { '@id': ORG_ID },
      },
    ],
  },
}

const PROJECT_PAGES = Object.fromEntries(PROJECTS.map(p => {
  const cs = CASE_STUDIES[p.slug] || {}
  return [`/work/${p.slug}`, {
    title: cs.seoTitle || `${p.name} — by Calquors`,
    description: cs.seoDescription || p.tagline,
    crumbs: [{ name: 'Work', path: '/work' }, { name: p.name, path: `/work/${p.slug}` }],
    schema: [productSchema(p)],
  }]
}))

export const PAGE_SEO = { ...STATIC_PAGES, ...PROJECT_PAGES }

export const NOT_FOUND_SEO = {
  title: 'Page not found — Calquors',
  description: 'This page does not exist. Explore Calquors products, services and contact details.',
}

export function seoFor(pathname) {
  const page = PAGE_SEO[pathname]
  if (!page) return { ...NOT_FOUND_SEO, canonical: url('/'), image: OG_IMAGE, jsonld: null, notFound: true }
  const graph = [...(page.schema || [])]
  if (page.crumbs) graph.push(breadcrumbs(page.crumbs))
  return {
    title: page.title,
    description: page.description,
    canonical: url(pathname),
    image: OG_IMAGE,
    jsonld: graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null,
  }
}
