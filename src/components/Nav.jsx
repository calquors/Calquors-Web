import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { COMPANY } from '../data/site'

const LINKS = [
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'Studio', path: '/studio' },
  { label: 'Company', path: '/company' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)

  // On the home page the nav sits over the video hero until you scroll past it.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Close the mobile menu on navigation; lock page scroll and allow Esc while it's open.
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const onMedia = pathname === '/' && !pastHero && !open

  return (
    <header className={`nav ${onMedia ? 'nav-on-media' : ''} ${open ? 'nav-open' : ''}`}>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
      <div className="container">
        <div className="nav-inner">
          <div className="nav-left">
            <Link to="/" className="nav-logo" aria-label="Calquors — home">
              <img className="nav-logo-mark" src="/favicon.svg" alt="" />
              <span>Calquors</span>
            </Link>

            <nav className="nav-links" aria-label="Main">
              {LINKS.map(l => (
                <NavLink
                  key={l.path}
                  to={l.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="nav-right">
            <Link to="/contact" className="nav-cta">Contact</Link>
            <button
              className="nav-burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(o => !o)}
            >
              <span /><span />
            </button>
          </div>
        </div>

        <nav
          id="mobile-menu"
          className="nav-sheet"
          aria-label="Mobile"
          hidden={!open}
        >
          {[{ label: 'Home', path: '/' }, ...LINKS, { label: 'Contact', path: '/contact' }].map((l, i) => (
            <NavLink
              key={l.path}
              to={l.path}
              end
              className={({ isActive }) => `nav-sheet-link ${isActive ? 'active' : ''}`}
              style={{ animationDelay: `${0.04 * i}s` }}
            >
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </NavLink>
          ))}
          <div className="nav-sheet-foot mono">
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <span>India</span>
          </div>
        </nav>
      </div>
    </header>
  )
}
