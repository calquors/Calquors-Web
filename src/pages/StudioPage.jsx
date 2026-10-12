import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS } from '../data/projects'
import { COMPANY } from '../data/site'

export default function StudioPage() {

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
              Calquors is a product studio based in India. We're builders,
              not consultants — every engagement ends with software in production. Alongside client
              work we build and run our own products: <strong style={{ color: 'var(--fg)' }}>OmegleVC</strong>,{' '}
              <strong style={{ color: 'var(--fg)' }}>Klyq</strong>, <strong style={{ color: 'var(--fg)' }}>Revfit</strong> and{' '}
              <strong style={{ color: 'var(--fg)' }}>Rivelo Labs</strong>. The legal entity is{' '}
              <Link to="/company" className="text-accent" style={{ textDecoration: 'underline' }}>{COMPANY.legalName}</Link>.
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
            <span className="eyebrow">Our products</span>
            <h2 className="h1" style={{ marginTop: 12, maxWidth: '18ch' }}>Apps and platforms we own.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              {PROJECTS.length} products, all live — on the web, Google Play and the App Store.
            </p>
          </div>

          <div className="pc-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} featured={p.featured} />
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="section">
        <div className="container">
          <div className="numbers">
            <div className="number-row">
              <span className="mono text-dim">REGISTERED USERS ON OMEGLEVC</span>
              <span className="num-big">3,550+</span>
            </div>
            <div className="number-row">
              <span className="mono text-dim">VISITORS TO OMEGLEVC</span>
              <span className="num-big">50k+</span>
            </div>
            <div className="number-row">
              <span className="mono text-dim">PRODUCTS LIVE ON WEB, GOOGLE PLAY &amp; APP STORE</span>
              <span className="num-big">{PROJECTS.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="row between center" style={{ flexWrap: 'wrap', gap: 24 }}>
            <h2 className="h1" style={{ maxWidth: '20ch' }}>Ready to build with us?</h2>
            <Link className="btn btn-primary" to="/contact">
              Start a project <span className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
