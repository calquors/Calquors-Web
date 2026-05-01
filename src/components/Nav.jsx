import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'studio', label: 'Studio', path: '/studio' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export default function Nav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="nav"
      style={{ borderBottomColor: scrolled ? 'var(--border)' : 'transparent' }}
    >
      <div className="container nav-inner">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <div className="nav-logo-mark" />
          <span>Calquors</span>
          <span className="mono text-dim" style={{ fontSize: 11, marginLeft: 4 }}>/ STUDIO</span>
        </div>

        <nav className="nav-links">
          {PAGES.slice(0, -1).map(p => (
            <span
              key={p.id}
              className={`nav-link ${pathname === p.path ? 'active' : ''}`}
              onClick={() => navigate(p.path)}
            >
              {p.label}
            </span>
          ))}
          <span className="nav-cta" onClick={() => navigate('/contact')}>
            Start a project<span className="nav-cta-arrow" />
          </span>
        </nav>
      </div>
    </header>
  )
}
