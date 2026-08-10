import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_SEO = {
  '/': {
    title: 'Calquors — A Product Studio That Ships Native Apps & Web Platforms',
    description: 'Calquors is an elite product studio engineering iOS apps, web platforms, and scalable backends. Home of Rivelo Labs, OmegleVC (omeglevc.com), and Revfit (revfit.app).',
    canonical: 'https://calquors.com/'
  },
  '/work': {
    title: 'Selected Work & Case Studies — Calquors Studio',
    description: 'Explore products shipped by Calquors, including Revfit (iOS App Store fitness app), OmegleVC (WebRTC video platform), and Rivelo Labs technology suite.',
    canonical: 'https://calquors.com/work'
  },
  '/services': {
    title: 'Services — Mobile Apps, Web Platforms & Software Engineering | Calquors',
    description: 'Full-stack studio capabilities: Native iOS & Android development, Next.js web applications, scalable backends, DevOps, and UX design systems.',
    canonical: 'https://calquors.com/services'
  },
  '/studio': {
    title: 'About Studio — Calquors & Our Sub-Brands (OmegleVC, Revfit, Rivelo)',
    description: 'Learn about Calquors product studio philosophy. We incubate and operate top-tier apps like OmegleVC (omeglevc.com), Revfit (revfit.app), and Rivelo Labs.',
    canonical: 'https://calquors.com/studio'
  },
  '/contact': {
    title: 'Start a Project — Work With Calquors Product Studio',
    description: 'Have something worth shipping? Contact Calquors for fixed-scope quotes and dedicated studio teams within 1 business day.',
    canonical: 'https://calquors.com/contact'
  }
}

export default function SEOHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = PAGE_SEO[pathname] || PAGE_SEO['/']

    // Document Title
    document.title = meta.title

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description)
    }

    // OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', meta.title)

    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', meta.description)

    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', meta.canonical)

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', meta.canonical)
    }
  }, [pathname])

  return null
}
