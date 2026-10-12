// Text-led product card: no mockups, just the product, proof and live links.
import { Link } from 'react-router-dom'

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProjectCard({ project, index, featured = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`
  return (
    <article
      className={`pc ${featured ? 'pc-featured' : ''}`}
      style={{ '--pc': project.color }}
    >
      <div className="pc-glow" aria-hidden="true" />

      <div className="pc-main">
        <div className="pc-top">
          <span className={`pc-mark ${project.logo ? 'pc-mark-with-image' : ''}`} aria-hidden="true">{project.logo ? <img className="pc-mark-image" src={project.logo} alt="" width="52" height="52" /> : project.name[0]}</span>
          <span className="pc-index mono">{String(index + 1).padStart(2, '0')}</span>
          <span className="pc-live mono"><i />Live</span>
        </div>

        <span className="pc-kicker mono">{project.kicker}</span>
        <H className="pc-name">
          <Link to={`/work/${project.slug}`} className="pc-name-link">{project.name}</Link>
        </H>
        <p className="pc-desc">{project.tagline}</p>

        <div className="pc-foot">
          <div className="pc-platforms">
            {project.platforms.map(p => <span key={p} className="pc-chip mono">{p}</span>)}
          </div>
          <div className="pc-links">
            <Link to={`/work/${project.slug}`} className="pc-link" aria-label={`${project.name} — product details`}>
              Details <ArrowIcon />
            </Link>
            {project.links.map(l => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener"
                className={`pc-link ${l.kind === 'play' ? 'pc-link-play' : ''}`}
                aria-label={`${project.name} on ${l.kind === 'play' ? 'Google Play' : l.label} (opens in a new tab)`}
              >
                {l.kind === 'play' && <PlayIcon />}
                {l.kind === 'play' ? 'Get it on Google Play' : l.label}
                {l.kind !== 'play' && <ArrowIcon />}
              </a>
            ))}
          </div>
        </div>
      </div>

      {project.stats && (
        <dl className="pc-stats">
          {project.stats.map(s => (
            <div key={s.k} className="pc-stat">
              <dt className="mono">{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}
