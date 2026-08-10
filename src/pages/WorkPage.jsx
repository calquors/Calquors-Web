import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectVisual from '../components/ProjectVisual'

const PROJECTS = [
  { slug: 'revfit', name: 'Revfit', cat: 'mobile', category: 'iOS App', year: '2025', color: 'oklch(0.55 0.18 145)', role: 'Design + Build', desc: 'A fitness app built for the App Store. Workout tracking, progress analytics, and personalised training plans — all native iOS.', tags: ['iOS', 'SwiftUI', 'App Store'], stats: [{ k: 'Platform', v: 'iOS' }, { k: 'Status', v: 'Live' }, { k: 'Year', v: '2025' }], url: 'https://revfit.app' },
  { slug: 'omeglevc', name: 'OmegleVC', cat: 'web', category: 'Web Platform', year: '2025', color: 'oklch(0.5 0.2 255)', role: 'Design + Build', desc: 'A modern video chat platform for spontaneous real-time connections. Built for the web with low-latency peer-to-peer technology.', tags: ['WebRTC', 'React', 'Node.js'], stats: [{ k: 'Platform', v: 'Web' }, { k: 'Status', v: 'Live' }, { k: 'Year', v: '2025' }], url: 'https://omeglevc.com' },
  { slug: 'rivelo', name: 'Rivelo Labs', cat: 'engineering', category: 'Engineering · Web', year: '2025', color: 'oklch(0.45 0.16 200)', role: 'Full Studio', desc: 'Our engineering and technology arm. Rivelo ships internal tools, experimental apps, and the platforms that power Calquors client work.', tags: ['Web', 'iOS', 'Android'], stats: [{ k: 'Platform', v: 'Web + Mobile' }, { k: 'Status', v: 'Live' }, { k: 'Year', v: '2025' }], url: 'https://www.rivelolabs.com' },
]

export default function WorkPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)

  const filters = [
    { id: 'all', label: 'All work', count: PROJECTS.length },
    { id: 'mobile', label: 'Mobile', count: PROJECTS.filter(p => p.cat === 'mobile').length },
    { id: 'web', label: 'Web', count: PROJECTS.filter(p => p.cat === 'web').length },
    { id: 'engineering', label: 'Engineering', count: PROJECTS.filter(p => p.cat === 'engineering').length },
  ]

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)

  return (
    <div className="page work-page">
      <section className="section-tight" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="page-header reveal">
            <span className="eyebrow">Work / Selected projects</span>
            <h1 className="h-display" style={{ marginTop: 16, maxWidth: '12ch' }}>
              Things we<br />have <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>shipped</em>.
            </h1>
            <p className="body-lg" style={{ marginTop: 24 }}>
              A selection of products built across mobile, web, and infrastructure.
              Each one started as a problem; we ended with software in production.
            </p>
          </div>

          <div className="filters" role="tablist">
            {filters.map(f => (
              <button
                key={f.id}
                className={`filter-pill ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="filter-count mono">{f.count}</span>
              </button>
            ))}
          </div>

          <div className="work-grid">
            {visible.map((p, i) => (
              <div
                key={p.slug}
                className="work-tile"
                onClick={() => setOpen(p)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="work-tile-thumb" style={{ background: `linear-gradient(135deg, ${p.color}, color-mix(in oklch, ${p.color} 30%, var(--bg)))` }}>
                  <div className="work-thumb-grid" />
                  <ProjectVisual slug={p.slug} />
                  <span className="work-tile-year mono">{p.year}</span>
                </div>
                <div className="work-tile-meta">
                  <div className="row between center" style={{ marginBottom: 6 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{p.name}</h3>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mono text-accent"
                      style={{ fontSize: 12, textDecoration: 'underline' }}
                    >
                      {p.url.replace('https://', '')} ↗
                    </a>
                  </div>
                  <div className="row gap-2 wrap">
                    <span className="mono text-dim" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</span>
                    <span className="text-dim">·</span>
                    <span className="mono text-dim" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 4 }).flatMap((_, copy) =>
              ['Built for the App Store', 'Engineered for scale', 'Designed in studio', 'Shipped on time'].map((t, i) => (
                <span key={`${copy}-${i}`} className="marquee-item">
                  {t}<span className="marquee-glyph">✷</span>
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="row between center" style={{ flexWrap: 'wrap', gap: 24 }}>
            <h2 className="h1" style={{ maxWidth: '18ch' }}>Want to be the next case study?</h2>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              Start a project <span className="btn-arrow" />
            </button>
          </div>
        </div>
      </section>

      {open && <CaseDrawer project={open} onClose={() => setOpen(null)} />}
    </div>
  )
}

function ProjectMark({ project }) {
  const marks = {
    revfit: (
      <svg viewBox="0 0 100 100" className="proj-mark">
        <rect x="30" y="20" width="40" height="60" rx="8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <rect x="38" y="14" width="24" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
        <path d="M38 50 L44 56 L62 44" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    omeglevc: (
      <svg viewBox="0 0 100 100" className="proj-mark">
        <rect x="18" y="30" width="44" height="32" rx="6" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M62 40 L80 32 L80 60 L62 52 Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="35" cy="46" r="4" fill="rgba(255,255,255,0.8)" />
      </svg>
    ),
    rivelo: (
      <svg viewBox="0 0 100 100" className="proj-mark">
        <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.9)" />
        <line x1="50" y1="22" x2="50" y2="36" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <line x1="50" y1="64" x2="50" y2="78" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <line x1="22" y1="50" x2="36" y2="50" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <line x1="64" y1="50" x2="78" y2="50" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      </svg>
    ),
  }
  return marks[project.slug] || null
}

function CaseDrawer({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose} aria-label="Close">
          <span /><span />
        </button>

        <div className="drawer-hero" style={{ background: `linear-gradient(135deg, ${project.color}, color-mix(in oklch, ${project.color} 30%, var(--bg)))` }}>
          <div className="work-thumb-grid" />
          <ProjectVisual slug={project.slug} />
          <div className="drawer-hero-meta">
            <span className="mono" style={{ color: 'rgba(255,255,255,0.7)' }}>{project.category} / {project.year}</span>
            <h2 className="h-display" style={{ color: 'white', fontSize: 'clamp(40px, 6vw, 72px)', marginTop: 8 }}>{project.name}</h2>
          </div>
        </div>

        <div className="drawer-body">
          <div className="drawer-grid">
            <div className="drawer-main">
              <h3 className="h2" style={{ marginBottom: 16 }}>{project.desc}</h3>
              <p className="body-lg">
                The brief was specific: a product that earns its place on the home screen.
                We delivered design, engineering, and store launch — on schedule, with a stabilization
                window built in. The numbers below tell the rest of the story.
              </p>
              <div className="drawer-tags" style={{ marginBottom: 24 }}>
                {project.tags.map(t => <span key={t} className="cap-tag mono">{t}</span>)}
              </div>
              <div style={{ marginTop: 24 }}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Visit {project.name} ({project.url.replace('https://', '')}) ↗
                </a>
              </div>
            </div>
            <div className="drawer-side">
              <div className="drawer-meta-row">
                <span className="mono text-dim">LIVE LINK</span>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-accent" style={{ textDecoration: 'underline' }}>{project.url.replace('https://', '')} ↗</a>
              </div>
              <div className="drawer-meta-row">
                <span className="mono text-dim">ROLE</span>
                <span>{project.role}</span>
              </div>
              <div className="drawer-meta-row">
                <span className="mono text-dim">YEAR</span>
                <span>{project.year}</span>
              </div>
              <div className="drawer-meta-row">
                <span className="mono text-dim">CATEGORY</span>
                <span>{project.category}</span>
              </div>
            </div>
          </div>
          <div className="drawer-stats">
            {project.stats.map(s => (
              <div key={s.k} className="drawer-stat">
                <div className="drawer-stat-v">{s.v}</div>
                <div className="mono text-dim">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
