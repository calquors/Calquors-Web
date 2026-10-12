import { Link, useParams } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { CASE_STUDIES } from '../data/caseStudies'
import NotFoundPage from './NotFoundPage'

const LINK_LABEL = { play: 'Get it on Google Play', appstore: 'Download on the App Store' }

export default function ProjectPage() {
  const { slug } = useParams()
  const project = PROJECTS.find(p => p.slug === slug)
  if (!project) return <NotFoundPage />
  const cs = CASE_STUDIES[slug] || { intro: [project.tagline], features: [] }
  const others = PROJECTS.filter(p => p.slug !== slug)

  return (
    <div className="page project-page" style={{ '--pc': project.color }}>
      <section className="section-tight cs-hero" style={{ paddingTop: 48 }}>
        <div className="cs-hero-glow" aria-hidden="true" />
        <div className="container">
          <nav className="crumbs mono" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><Link to="/work">Work</Link><span>/</span>
            <span aria-current="page">{project.name}</span>
          </nav>

          <div className="cs-head reveal">
            <div className="row gap-3 center" style={{ marginBottom: 20 }}>
              <Mark project={project} />
              <span className="pc-live mono"><i />Live</span>
            </div>
            <span className="eyebrow">{project.kicker}</span>
            <h1 className="h-display" style={{ marginTop: 12 }}>{project.name}</h1>
            <p className="body-lg" style={{ marginTop: 20, maxWidth: '58ch' }}>{project.tagline}</p>

            <div className="pc-links" style={{ marginTop: 32 }}>
              {project.links.map(l => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener"
                  className={`pc-link ${l.kind !== 'web' ? 'pc-link-play' : ''}`}
                >
                  {LINK_LABEL[l.kind] || `Visit ${l.label}`} ↗
                </a>
              ))}
            </div>
          </div>

          {project.stats && (
            <dl className="cs-stats">
              {project.stats.map(s => (
                <div key={s.k} className="pc-stat">
                  <dt className="mono">{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cs-body">
            <div className="cs-main">
              <h2 className="h2">About {project.name}</h2>
              {cs.intro.map((para, i) => (
                <p key={i} className="body-lg" style={{ marginTop: 16 }}>{para}</p>
              ))}

              {cs.features.length > 0 && (
                <>
                  <h2 className="h2" style={{ marginTop: 48 }}>Features</h2>
                  <ul className="cs-features">
                    {cs.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </>
              )}
            </div>

            <aside className="cs-side">
              <div className="fact"><dt className="mono">Built by</dt><dd><Link to="/company" className="text-accent">Calquors Private Limited</Link></dd></div>
              <div className="fact"><dt className="mono">Platforms</dt><dd>{project.platforms.join(' · ')}</dd></div>
              <div className="fact"><dt className="mono">Category</dt><dd>{project.kicker}</dd></div>
              <div className="fact"><dt className="mono">Status</dt><dd>Live</dd></div>
              {project.links.map(l => (
                <div className="fact" key={l.url}>
                  <dt className="mono">{l.kind === 'web' ? 'Website' : l.label}</dt>
                  <dd><a href={l.url} target="_blank" rel="noopener" className="text-accent">{l.kind === 'web' ? l.label : 'Open listing'} ↗</a></dd>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">More from Calquors</span>
            <h2 className="h1" style={{ marginTop: 12 }}>Other live products</h2>
          </div>
          <div className="cs-others">
            {others.map(p => (
              <Link key={p.slug} to={`/work/${p.slug}`} className="cs-other" style={{ '--pc': p.color }}>
                <Mark project={p} />
                <span className="cs-other-name">{p.name}</span>
                <span className="mono text-dim">{p.kicker}</span>
                <span className="btn-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row between center" style={{ flexWrap: 'wrap', gap: 24 }}>
            <h2 className="h1" style={{ maxWidth: '20ch' }}>Want something like {project.name}?</h2>
            <Link className="btn btn-primary" to="/contact">
              Start a project <span className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Mark({ project }) {
  return (
    <span className={`pc-mark ${project.logo ? 'pc-mark-with-image' : ''}`} aria-hidden="true">
      {project.logo ? <img className="pc-mark-image" src={project.logo} alt="" width="52" height="52" /> : project.name[0]}
    </span>
  )
}
