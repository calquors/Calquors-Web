import { useState } from 'react'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 'mobile', n: '01', title: 'Mobile applications',
    blurb: 'iOS, Android, and cross-platform apps engineered for the App Store and Google Play.',
    items: [
      { t: 'Native iOS', d: 'Swift, SwiftUI, UIKit. Built to Apple\'s Human Interface Guidelines.' },
      { t: 'Native Android', d: 'Kotlin and Jetpack Compose. Material 3 from the start.' },
      { t: 'Cross-platform', d: 'React Native and Flutter when sharing a codebase makes sense.' },
      { t: 'Store submissions', d: 'TestFlight, beta tracks, and review handling — not your problem.' },
    ],
  },
  {
    id: 'web', n: '02', title: 'Web & SaaS',
    blurb: 'Marketing sites, dashboards, and SaaS frontends. Performance-first, framework-agnostic.',
    items: [
      { t: 'Landing & marketing', d: 'Next.js or Astro. 100/100 Lighthouse, edge-deployed.' },
      { t: 'Web applications', d: 'Dashboards, admin panels, and B2B SaaS frontends.' },
      { t: 'Headless commerce', d: 'Shopify, Stripe, and custom checkouts.' },
      { t: 'CMS integration', d: 'Sanity, Contentful, or your existing stack.' },
    ],
  },
  {
    id: 'engineering', n: '03', title: 'Engineering & infrastructure',
    blurb: 'Backends, APIs, and cloud architecture that scales without rewrites.',
    items: [
      { t: 'API & backend', d: 'Go, Node, Python. REST, GraphQL, and tRPC.' },
      { t: 'Data & databases', d: 'Postgres, ClickHouse, Redis. Schema design that ages well.' },
      { t: 'Cloud & DevOps', d: 'AWS, GCP, Vercel. Terraform and Kubernetes when you need them.' },
      { t: 'AI integrations', d: 'OpenAI, Anthropic, embeddings, RAG pipelines.' },
    ],
  },
  {
    id: 'design', n: '04', title: 'Product design',
    blurb: 'Brand, interface, and motion — from first wireframe to shipped pixels.',
    items: [
      { t: 'Product UX', d: 'Flows, wireframes, prototypes. Usability tested before build.' },
      { t: 'Visual design', d: 'Brand identity, design systems, and component libraries.' },
      { t: 'Motion design', d: 'Lottie, Rive, and CSS animations that feel native.' },
      { t: 'Design systems', d: 'Tokens, libraries, and the docs to keep them alive.' },
    ],
  },
]

export default function ServicesPage() {
  const [open, setOpen] = useState('mobile')

  return (
    <div className="page services-page">
      <section className="section-tight" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="page-header reveal">
            <span className="eyebrow">Services / What we do</span>
            <h1 className="h-display" style={{ marginTop: 16, maxWidth: '14ch' }}>
              Every layer<br />of the <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>stack</em>.
            </h1>
            <p className="body-lg" style={{ marginTop: 24 }}>
              We're a multidisciplinary studio — designers and engineers under one roof.
              That means fewer handoffs, faster iteration, and one team accountable for the result.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="services-list">
            {SERVICES.map(s => (
              <div key={s.id} className={`service-row ${open === s.id ? 'open' : ''}`}>
                <button className="service-head" onClick={() => setOpen(open === s.id ? null : s.id)}>
                  <div className="service-head-left">
                    <span className="mono text-dim">{s.n}</span>
                    <h3 className="h2" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>{s.title}</h3>
                  </div>
                  <div className="service-head-right">
                    <span className="body" style={{ maxWidth: '32ch', textAlign: 'right' }}>{s.blurb}</span>
                    <span className={`service-toggle ${open === s.id ? 'rot' : ''}`}>+</span>
                  </div>
                </button>
                <div className="service-content">
                  <div className="service-grid">
                    {s.items.map(it => (
                      <div key={it.t} className="service-item">
                        <div className="service-item-mark" />
                        <h4 style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 }}>{it.t}</h4>
                        <p className="body" style={{ fontSize: 14 }}>{it.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How we engage</span>
            <h2 className="h1" style={{ marginTop: 12, maxWidth: '16ch' }}>Three ways to work together.</h2>
          </div>

          <div className="engage-grid">
            <div className="engage-card">
              <div className="engage-icon"><div className="engage-icon-shape e1" /></div>
              <h3 className="h3">Fixed-scope project</h3>
              <p className="body" style={{ marginTop: 12 }}>You have a defined product. We deliver it for a fixed quote, on a fixed timeline.</p>
              <div className="mono text-dim engage-meta">FROM 6 WEEKS</div>
            </div>
            <div className="engage-card engage-card-feat">
              <span className="engage-tag mono">MOST COMMON</span>
              <div className="engage-icon"><div className="engage-icon-shape e2" /></div>
              <h3 className="h3">Embedded studio</h3>
              <p className="body" style={{ marginTop: 12 }}>A dedicated squad of designers and engineers, embedded with your team for a quarter or more.</p>
              <div className="mono text-dim engage-meta">FROM 12 WEEKS</div>
            </div>
            <div className="engage-card">
              <div className="engage-icon"><div className="engage-icon-shape e3" /></div>
              <h3 className="h3">Sprint engagements</h3>
              <p className="body" style={{ marginTop: 12 }}>Short, focused 2-week sprints to ship a feature, audit, or prototype.</p>
              <div className="mono text-dim engage-meta">2–4 WEEKS</div>
            </div>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link className="btn btn-primary" to="/contact">
              Get a quote <span className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
