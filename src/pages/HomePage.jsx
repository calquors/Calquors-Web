import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectVisual from '../components/ProjectVisual'

const FEATURED_WORK = [
  { slug: 'revfit', name: 'Revfit', category: 'iOS App · App Store', year: '2025', color: 'oklch(0.55 0.18 145)', url: 'https://revfit.app' },
  { slug: 'omeglevc', name: 'OmegleVC', category: 'Web Platform', year: '2025', color: 'oklch(0.5 0.2 255)', url: 'https://omeglevc.com' },
  { slug: 'rivelo', name: 'Rivelo Labs', category: 'Engineering · Web', year: '2025', color: 'oklch(0.45 0.16 200)', url: 'https://www.rivelolabs.com' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef(null)
  const verbs = ['build', 'ship', 'design', 'scale']
  const [verbIdx, setVerbIdx] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setVerbIdx(v => (v + 1) % verbs.length), 2200)
    return () => clearInterval(i)
  }, [])

  const onHeroMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="page home-page">
      {/* HERO */}
      <section
        ref={heroRef}
        className="hero"
        onMouseMove={onHeroMove}
        style={{ '--mx': mouse.x, '--my': mouse.y }}
      >
        <div className="hero-glow" />
        <div className="hero-orb" />

        <div className="container hero-inner">
          <div className="hero-meta reveal">
            <span className="eyebrow">Calquors / Studio</span>
            <span className="mono text-dim">EST. 2021— REMOTE-FIRST</span>
          </div>

          <h1 className="h-display hero-title reveal" style={{ animationDelay: '0.1s' }}>
            We <span className="hero-verb" key={verbIdx}>{verbs[verbIdx]}</span><br />
            products that<br />
            <span className="hero-italic">actually&nbsp;</span>ship.
          </h1>

          <p className="body-lg hero-sub reveal" style={{ animationDelay: '0.2s' }}>
            Calquors is a product studio building mobile apps, websites, and the
            engineering systems that make them work. Our portfolio of flagship products includes{' '}
            <a
              href="https://omeglevc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
              style={{ textDecoration: 'underline', textDecorationColor: 'color-mix(in oklch, var(--accent) 40%, transparent)', textUnderlineOffset: '3px' }}
            >
              OmegleVC
            </a>
            ,{' '}
            <a
              href="https://revfit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
              style={{ textDecoration: 'underline', textDecorationColor: 'color-mix(in oklch, var(--accent) 40%, transparent)', textUnderlineOffset: '3px' }}
            >
              Revfit
            </a>
            , and{' '}
            <a
              href="https://www.rivelolabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
              style={{ textDecoration: 'underline', textDecorationColor: 'color-mix(in oklch, var(--accent) 40%, transparent)', textUnderlineOffset: '3px' }}
            >
              Rivelo Labs
            </a>
            .
          </p>

          <div className="hero-cta reveal" style={{ animationDelay: '0.3s' }}>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              Start a project <span className="btn-arrow" />
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/work')}>
              See our work
            </button>
          </div>

          <div className="hero-frame reveal" style={{ animationDelay: '0.4s' }}>
            <HeroComposition mouse={mouse} />
          </div>

          <div className="hero-tickers reveal" style={{ animationDelay: '0.5s' }}>
            <TickerBar />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">01 — Capabilities</span>
            <h2 className="h1" style={{ maxWidth: '16ch', marginTop: 12 }}>
              A studio that owns the <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>full stack</em> of product.
            </h2>
          </div>
          <div className="caps-grid">
            <CapCard num="01" title="Mobile apps" desc="iOS, Android, and cross-platform apps engineered for the App Stores. From MVP to scale." tags={['SwiftUI', 'Kotlin', 'React Native', 'Flutter']} accent />
            <CapCard num="02" title="Web platforms" desc="Marketing sites, dashboards, and SaaS frontends. Performance-first, framework-agnostic." tags={['Next.js', 'Astro', 'TypeScript']} />
            <CapCard num="03" title="Engineering" desc="Backends, APIs, infrastructure. We architect systems that scale without rewrites." tags={['Postgres', 'Go', 'AWS', 'Kubernetes']} />
            <CapCard num="04" title="Product design" desc="From wireframe to spec. Interaction design, design systems, and motion." tags={['Figma', 'Design tokens', 'Prototyping']} />
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head row between center" style={{ flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="eyebrow">02 — Recent work</span>
              <h2 className="h1" style={{ marginTop: 12 }}>Shipped this year.</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate('/work')}>
              All projects <span className="btn-arrow" />
            </button>
          </div>
          <div className="work-row">
            {FEATURED_WORK.map((p, i) => (
              <WorkCard key={p.slug} project={p} index={i} onClick={() => navigate('/work')} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessSection />

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-block">
            <div className="cta-grid">
              <div className="cta-bg" />
              <div className="cta-content">
                <span className="eyebrow" style={{ color: 'var(--accent)' }}>Get in touch</span>
                <h2 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', marginTop: 16 }}>
                  Have something<br />worth shipping?
                </h2>
                <p className="body-lg" style={{ marginTop: 16 }}>
                  Tell us about your idea. We respond within one business day with a clear scope,
                  timeline, and a fixed quote.
                </p>
                <div className="row gap-3" style={{ marginTop: 32 }}>
                  <button className="btn btn-primary" onClick={() => navigate('/contact')}>
                    Start a project <span className="btn-arrow" />
                  </button>
                  <button className="btn btn-ghost" onClick={() => navigate('/services')}>
                    See services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroComposition({ mouse }) {
  const tx = (mouse.x - 0.5) * 30
  const ty = (mouse.y - 0.5) * 20

  return (
    <div className="hero-comp">
      {/* Phone mockup */}
      <div className="hero-phone" style={{ transform: `translate(${tx * 0.3}px, ${ty * 0.3}px) rotate(-6deg)` }}>
        <div className="phone-screen">
          <div className="phone-statusbar">
            <span>9:41</span>
            <span className="phone-notch" />
            <span className="phone-status-icons">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </span>
          </div>
          <div className="phone-app">
            <div className="phone-app-head">
              <div className="phone-avatar" />
              <div className="col gap-1" style={{ flex: 1 }}>
                <div className="skel" style={{ width: '60%', height: 8 }} />
                <div className="skel" style={{ width: '40%', height: 6, opacity: 0.5 }} />
              </div>
            </div>
            <div className="phone-card">
              <div className="phone-card-glow" />
              <div className="mono" style={{ fontSize: 9, color: 'var(--fg-dim)', marginBottom: 6 }}>BALANCE</div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>$ 24,180</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--accent)', marginTop: 4 }}>↑ 12.4%</div>
              <div className="phone-chart">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" width="100%" height="30">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="var(--accent)" stopOpacity="0.6" />
                      <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,22 L12,18 L24,20 L36,12 L48,15 L60,8 L72,10 L84,4 L100,6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
                  <path d="M0,22 L12,18 L24,20 L36,12 L48,15 L60,8 L72,10 L84,4 L100,6 L100,30 L0,30 Z" fill="url(#g1)" opacity="0.3" />
                </svg>
              </div>
            </div>
            <div className="phone-list">
              <div className="phone-list-item"><div className="phone-icon" /><div className="skel" style={{ flex: 1, height: 8 }} /></div>
              <div className="phone-list-item"><div className="phone-icon" style={{ background: 'var(--accent)' }} /><div className="skel" style={{ flex: 1, height: 8 }} /></div>
              <div className="phone-list-item"><div className="phone-icon" /><div className="skel" style={{ flex: 1, height: 8 }} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Browser mockup */}
      <div className="hero-browser" style={{ transform: `translate(${tx * -0.2}px, ${ty * -0.2}px) rotate(4deg)` }}>
        <div className="browser-bar">
          <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
          <span className="browser-url mono">calquors.studio/dashboard</span>
        </div>
        <div className="browser-body">
          <div className="browser-side">
            <div className="skel" style={{ width: '60%', height: 6 }} />
            <div className="skel" style={{ width: '80%', height: 6, opacity: 0.6 }} />
            <div className="skel" style={{ width: '70%', height: 6, opacity: 0.6 }} />
            <div className="skel" style={{ width: '50%', height: 6, opacity: 0.4 }} />
          </div>
          <div className="browser-main">
            <div className="row between" style={{ marginBottom: 10 }}>
              <div className="skel" style={{ width: 60, height: 8 }} />
              <div className="skel" style={{ width: 40, height: 8, background: 'var(--accent)' }} />
            </div>
            <div className="browser-bars">
              {[60, 40, 80, 50, 90, 70, 55].map((h, i) => (
                <div key={i} className="browser-bar-item" style={{ height: `${h}%`, background: i === 4 ? 'var(--accent)' : 'var(--border-strong)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="hero-badge hero-badge-1" style={{ transform: `translate(${tx * 0.5}px, ${ty * 0.5}px)` }}>
        <span className="mono">DEPLOY</span>
        <span className="badge-dot" />
      </div>
      <div className="hero-badge hero-badge-2" style={{ transform: `translate(${tx * -0.4}px, ${ty * -0.4}px)` }}>
        <span className="mono">v2.4.0</span>
      </div>
    </div>
  )
}

function TickerBar() {
  const items = ['MOBILE APPS', 'WEB PLATFORMS', 'DESIGN SYSTEMS', 'BACKEND ENGINEERING', 'AI INTEGRATIONS', 'INFRASTRUCTURE', 'PRODUCT STRATEGY']
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="ticker-item mono">
            {it}<span className="ticker-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CapCard({ num, title, desc, tags, accent }) {
  return (
    <div className={`cap-card ${accent ? 'cap-accent' : ''}`}>
      <div className="cap-head">
        <span className="mono text-dim">{num}</span>
        <div className={`cap-dot ${accent ? 'cap-dot-on' : ''}`} />
      </div>
      <h3 className="cap-title">{title}</h3>
      <p className="body" style={{ marginTop: 12, marginBottom: 24 }}>{desc}</p>
      <div className="cap-tags">
        {tags.map(t => <span key={t} className="cap-tag mono">{t}</span>)}
      </div>
    </div>
  )
}

function WorkCard({ project, index, onClick }) {
  return (
    <div className="work-card" onClick={onClick}>
      <div className="work-thumb" style={{ background: `linear-gradient(135deg, ${project.color}, color-mix(in oklch, ${project.color} 50%, var(--bg)))` }}>
        <div className="work-thumb-grid" />
        <ProjectVisual slug={project.slug} />
        <span className="work-thumb-num mono">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="work-meta">
        <div className="row between center">
          <h3 className="work-name">{project.name}</h3>
          <span className="mono text-dim">{project.year}</span>
        </div>
        <div className="row between center" style={{ marginTop: 4 }}>
          <span className="mono text-mute" style={{ fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{project.category}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mono text-accent"
            style={{ fontSize: 11, textDecoration: 'underline' }}
          >
            {project.url.replace('https://', '')} ↗
          </a>
        </div>
      </div>
    </div>
  )
}

function ProcessSection() {
  const [active, setActive] = useState(0)
  const steps = [
    { n: '01', t: 'Discover', d: 'Workshops, audits, and a written scope. We define what "done" looks like before a single pixel is drawn.' },
    { n: '02', t: 'Design', d: 'Wireframes, prototypes, and design systems. We test interactions before we build them.' },
    { n: '03', t: 'Build', d: 'Two-week sprints with weekly demos. You see real software, not slides.' },
    { n: '04', t: 'Ship', d: 'Store submissions, monitoring, and a 30-day stabilization window included.' },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">03 — Process</span>
          <h2 className="h1" style={{ marginTop: 12, maxWidth: '18ch' }}>Four phases. No surprises.</h2>
        </div>
        <div className="process">
          <div className="process-tabs">
            {steps.map((s, i) => (
              <button key={s.n} className={`process-tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
                <span className="mono">{s.n}</span>
                <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{s.t}</span>
                <span className="process-tab-arrow">→</span>
              </button>
            ))}
          </div>
          <div className="process-content">
            <div className="process-content-num mono">{steps[active].n} / 04</div>
            <h3 className="h2" style={{ marginBottom: 16 }}>{steps[active].t}</h3>
            <p className="body-lg">{steps[active].d}</p>
            <div className="process-viz">
              <svg viewBox="0 0 400 200" width="100%" height="200">
                {steps.map((s, i) => (
                  <g key={i}>
                    <circle
                      cx={50 + i * 100} cy="100"
                      r={i === active ? '30' : '18'}
                      fill={i === active ? 'var(--accent)' : 'var(--bg-elev-2)'}
                      stroke={i === active ? 'var(--accent)' : 'var(--border-strong)'}
                      strokeWidth="1.5"
                      style={{ transition: 'all 0.4s var(--ease-spring)' }}
                    />
                    <text
                      x={50 + i * 100} y="105"
                      textAnchor="middle"
                      fill={i === active ? 'var(--accent-fg)' : 'var(--fg-muted)'}
                      fontSize="11"
                      fontFamily="var(--font-mono)"
                      style={{ transition: 'all 0.3s' }}
                    >
                      {s.n}
                    </text>
                    {i < 3 && (
                      <line
                        x1={50 + i * 100 + (i === active ? 30 : 18)}
                        y1="100"
                        x2={50 + (i + 1) * 100 - (i + 1 === active ? 30 : 18)}
                        y2="100"
                        stroke="var(--border-strong)"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
