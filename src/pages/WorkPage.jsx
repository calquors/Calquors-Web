import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS } from '../data/projects'

export default function WorkPage() {
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All work' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'web', label: 'Web' },
    { id: 'engineering', label: 'Engineering' },
  ].map(f => ({
    ...f,
    count: f.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.cats.includes(f.id)).length,
  }))

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cats.includes(filter))

  return (
    <div className="page work-page">
      <section className="section-tight" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="page-header reveal">
            <span className="eyebrow">Work / Live products</span>
            <h1 className="h-display" style={{ marginTop: 16, maxWidth: '12ch' }}>
              Things we<br />have <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>shipped</em>.
            </h1>
            <p className="body-lg" style={{ marginTop: 24 }}>
              Every product here is live — on the web, Google Play and the App Store.
              Each one started as a problem; we ended with software people use every day.
            </p>
          </div>

          <div className="filters" role="group" aria-label="Filter products">
            {filters.map(f => (
              <button
                key={f.id}
                className={`filter-pill ${filter === f.id ? 'active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="filter-count mono">{f.count}</span>
              </button>
            ))}
          </div>

          <div className="pc-grid">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={PROJECTS.indexOf(p)}
                featured={p.featured && filter === 'all'}
                headingLevel={2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 4 }).flatMap((_, copy) =>
              ['Live on Google Play', 'Live on the App Store', 'Engineered for scale', 'Built in India'].map((t, i) => (
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
            <Link className="btn btn-primary" to="/contact">
              Start a project <span className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
