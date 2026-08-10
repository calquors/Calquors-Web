import { useNavigate } from 'react-router-dom'

export default function StudioPage() {
  const navigate = useNavigate()

  return (
    <div className="page studio-page">
      <section className="section-tight" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="page-header reveal">
            <span className="eyebrow">Studio / About Calquors</span>
            <h1 className="h-display" style={{ marginTop: 16, maxWidth: '13ch' }}>
              A small studio<br />with <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>broad</em> output.
            </h1>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: '62ch' }}>
              Calquors is a remote-first product studio. We're builders, not consultants — every
              engagement ends with software in production. Alongside client work, we incubate our
              own products under the <strong style={{ color: 'var(--fg)' }}>Rivelo Labs</strong> banner.
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-tight">
        <div className="container">
          <div className="manifesto">
            <div className="manifesto-side">
              <span className="eyebrow">Manifesto</span>
            </div>
            <div className="manifesto-main">
              <p className="manifesto-line"><span className="mono manifesto-num">01</span> We build. We don't write strategy decks.</p>
              <p className="manifesto-line"><span className="mono manifesto-num">02</span> Every sprint ends with something a user can touch.</p>
              <p className="manifesto-line"><span className="mono manifesto-num">03</span> Designers write code. Engineers care about pixels.</p>
              <p className="manifesto-line"><span className="mono manifesto-num">04</span> Small teams ship. Big teams meet.</p>
              <p className="manifesto-line"><span className="mono manifesto-num">05</span> We say no to a lot, so we can say yes well.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-businesses */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Sub-brands</span>
            <h2 className="h1" style={{ marginTop: 12, maxWidth: '18ch' }}>Apps and platforms we own.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              In 2025 we shipped three products: Rivelo Labs, OmegleVC, and Revfit —
              live on the web and the App Store.
            </p>
          </div>

          <div className="brand-grid">
            <div className="brand-card brand-feat">
              <div className="brand-mark">
                <div className="brand-mark-shape rivelo" />
              </div>
              <div className="brand-body">
                <div className="row between center" style={{ marginBottom: 12 }}>
                  <span className="mono text-dim">FLAGSHIP</span>
                  <a href="https://www.rivelolabs.com" target="_blank" rel="noopener noreferrer" className="mono text-accent">→ rivelolabs.com</a>
                </div>
                <h3 className="h2">Rivelo Labs</h3>
                <p className="body-lg" style={{ marginTop: 16 }}>
                  Our engineering and technology arm. Rivelo ships internal tools,
                  experimental apps, and the platforms that power Calquors' client work.
                </p>
                <div className="brand-meta">
                  <div><span className="mono text-dim">SHIPPED</span><span>2025</span></div>
                  <div><span className="mono text-dim">PLATFORMS</span><span>iOS · Android · Web</span></div>
                  <div><span className="mono text-dim">STATUS</span><span>Live</span></div>
                </div>
              </div>
            </div>

            <div className="brand-card">
              <div className="brand-mark">
                <svg viewBox="0 0 60 60" width="32" height="32">
                  <rect x="8" y="16" width="26" height="22" rx="4" fill="none" stroke="var(--fg)" strokeWidth="2" />
                  <path d="M34 24 L50 18 L50 40 L34 34 Z" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="19" cy="27" r="3" fill="var(--fg)" />
                </svg>
              </div>
              <div className="brand-body">
                <div className="row between center" style={{ marginBottom: 12 }}>
                  <span className="mono text-dim">WEB PLATFORM</span>
                  <a href="https://omeglevc.com" target="_blank" rel="noopener noreferrer" className="mono text-accent">→ omeglevc.com</a>
                </div>
                <h3 className="h3">OmegleVC</h3>
                <p className="body" style={{ marginTop: 8 }}>A modern video chat platform for spontaneous real-time connections, built with WebRTC.</p>
                <div className="brand-meta" style={{ marginTop: 16 }}>
                  <div><span className="mono text-dim">SHIPPED</span><span>2025</span></div>
                  <div><span className="mono text-dim">PLATFORM</span><span>Web · WebRTC</span></div>
                  <div><span className="mono text-dim">BACKLINK</span><a href="https://omeglevc.com" target="_blank" rel="noopener noreferrer" className="text-accent" style={{ textDecoration: 'underline' }}>omeglevc.com ↗</a></div>
                </div>
              </div>
            </div>

            <div className="brand-card">
              <div className="brand-mark">
                <svg viewBox="0 0 60 60" width="32" height="32">
                  <rect x="16" y="6" width="28" height="48" rx="6" fill="none" stroke="var(--fg)" strokeWidth="2" />
                  <rect x="22" y="2" width="16" height="6" rx="3" fill="none" stroke="var(--fg)" strokeWidth="1.5" />
                  <path d="M22 32 L27 38 L40 26" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="brand-body">
                <div className="row between center" style={{ marginBottom: 12 }}>
                  <span className="mono text-dim">iOS APP</span>
                  <a href="https://revfit.app" target="_blank" rel="noopener noreferrer" className="mono text-accent">→ revfit.app</a>
                </div>
                <h3 className="h3">Revfit</h3>
                <p className="body" style={{ marginTop: 8 }}>Native iOS fitness app with workout tracking, progress analytics, and personalised training plans.</p>
                <div className="brand-meta" style={{ marginTop: 16 }}>
                  <div><span className="mono text-dim">SHIPPED</span><span>2025</span></div>
                  <div><span className="mono text-dim">PLATFORM</span><span>iOS App Store</span></div>
                  <div><span className="mono text-dim">BACKLINK</span><a href="https://revfit.app" target="_blank" rel="noopener noreferrer" className="text-accent" style={{ textDecoration: 'underline' }}>revfit.app ↗</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="section">
        <div className="container">
          <div className="numbers">
            <div className="number-row">
              <span className="mono text-dim">PRODUCTS SHIPPED IN 2025</span>
              <span className="num-big">3</span>
            </div>
            <div className="number-row">
              <span className="mono text-dim">PLATFORMS WE BUILD ON</span>
              <span className="num-big">3</span>
            </div>
            <div className="number-row">
              <span className="mono text-dim">LIVE ON APP STORE</span>
              <span className="num-big">1</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="row between center" style={{ flexWrap: 'wrap', gap: 24 }}>
            <h2 className="h1" style={{ maxWidth: '20ch' }}>Ready to build with us?</h2>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              Start a project <span className="btn-arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
