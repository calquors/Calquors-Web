import { useNavigate } from 'react-router-dom'

const PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'studio', label: 'Studio', path: '/studio' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="nav-logo" style={{ marginBottom: 16 }}>
              <div className="nav-logo-mark" />
              <span>Calquors</span>
            </div>
            <p className="body" style={{ maxWidth: '36ch', fontSize: 14 }}>
              A product studio building mobile apps, websites, and the engineering systems
              that make them work.
            </p>
            <div className="row gap-2 center" style={{ marginTop: 24 }}>
              <span className="avail-dot" />
              <span className="mono text-mute" style={{ fontSize: 11 }}>ACCEPTING NEW PROJECTS</span>
            </div>
          </div>
          <div className="footer-col">
            <h5>Pages</h5>
            {PAGES.map(p => (
              <span key={p.id} className="footer-link" onClick={() => navigate(p.path)}>
                {p.label}
              </span>
            ))}
          </div>
          <div className="footer-col">
            <h5>Products & Backlinks</h5>
            <a href="https://www.rivelolabs.com" target="_blank" rel="noopener noreferrer" className="footer-link">Rivelo Labs ↗</a>
            <a href="https://omeglevc.com" target="_blank" rel="noopener noreferrer" className="footer-link">OmegleVC (omeglevc.com) ↗</a>
            <a href="https://revfit.app" target="_blank" rel="noopener noreferrer" className="footer-link">Revfit (revfit.app) ↗</a>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <a href="mailto:hello@calquors.studio">hello@calquors.studio</a>
            <span className="footer-link" onClick={() => navigate('/contact')}>Start a project</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Calquors Studio. All rights reserved.</span>
          <span>v2.4.0 — Built in studio</span>
        </div>
      </div>
    </footer>
  )
}
