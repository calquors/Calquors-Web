import { Link } from 'react-router-dom'
import { COMPANY } from '../data/site'
import { PROJECTS } from '../data/projects'

const PAGES = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'Studio', path: '/studio' },
  { label: 'Company', path: '/company' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="nav-logo" style={{ marginBottom: 16 }}>
              <img className="nav-logo-mark" src="/favicon.svg" alt="" />
              <span>Calquors</span>
            </Link>
            <p className="body" style={{ maxWidth: '34ch', fontSize: 14 }}>
              A product studio building mobile apps, websites, and the engineering systems
              that make them work.
            </p>
            <address className="footer-address">
              {COMPANY.country}
            </address>
            <div className="row gap-2 center" style={{ marginTop: 20 }}>
              <span className="avail-dot" />
              <span className="mono text-mute" style={{ fontSize: 11 }}>ACCEPTING NEW PROJECTS</span>
            </div>
          </div>
          <nav className="footer-col" aria-label="Footer">
            <h2 className="footer-h">Pages</h2>
            {PAGES.map(p => (
              <Link key={p.path} to={p.path}>{p.label}</Link>
            ))}
          </nav>
          <div className="footer-col">
            <h2 className="footer-h">Products</h2>
            {PROJECTS.map(p => {
              const main = p.links.find(l => l.kind === 'web') || p.links[0]
              const secondary = p.links.filter(l => l !== main)
              return (
                <span key={p.slug} className="footer-product">
                  <a href={main.url} target="_blank" rel="noopener">{p.name} ↗</a>
                  {secondary.map(link => (
                    <a key={link.url} className="footer-sub mono" href={link.url} target="_blank" rel="noopener">{link.label}</a>
                  ))}
                </span>
              )
            })}
          </div>
          <div className="footer-col">
            <h2 className="footer-h">Contact</h2>
            <a className="footer-mail" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <Link to="/contact">Start a project</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {COMPANY.legalName}. All rights reserved.</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  )
}
