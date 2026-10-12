import { useState } from 'react'
import { Link } from 'react-router-dom'
import VideoHero from '../components/VideoHero'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS, PROOF } from '../data/projects'

const CAPABILITIES = [
  { title: 'Mobile apps', kind: 'mobile', desc: 'Made to feel right. Native iOS and Android experiences, thoughtfully built from the first tap.', tags: ['iOS', 'Android', 'Cross-platform'] },
  { title: 'Web platforms', kind: 'web', desc: 'Fast, intuitive, and ready to grow. Websites and platforms that turn complexity into clarity.', tags: ['Websites', 'SaaS', 'Dashboards'] },
  { title: 'Engineering', kind: 'engineering', desc: 'The foundation behind every great experience. Reliable APIs, backends, and infrastructure that scale.', tags: ['APIs', 'Cloud', 'Infrastructure'] },
  { title: 'Product design', kind: 'design', desc: 'Every detail has a purpose. From the first idea to an interface people love coming back to.', tags: ['Interfaces', 'Design systems', 'Prototypes'] },
]

export default function HomePage() {
  return (
    <div className="page home-page">
      <VideoHero />
      <div className="home-lower">
        <section className="home-proof" aria-label="Calquors by the numbers">
          <div className="container">
            <div className="home-proof-intro"><span>Small studio. Real-world impact.</span><span className="home-availability"><i /> Open for new projects</span></div>
            <dl className="proof-grid">
              {PROOF.map(p => <div key={p.k} className="proof-cell"><dt className="proof-k">{p.k}</dt><dd className="proof-v">{p.v}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="home-section home-capabilities" aria-labelledby="capabilities-title">
          <div className="container">
            <SectionHeading eyebrow="What we do" title={<>Big ideas.<br />Beautifully built.</>} id="capabilities-title" description="Design, development, and everything in between. One studio, from your first idea to your next launch." />
            <div className="caps-grid">
              {CAPABILITIES.map(c => (
                <article key={c.kind} className={`cap-card home-cap-${c.kind}`}>
                  <div className="home-cap-icon"><CapabilityIcon kind={c.kind} /></div>
                  <h3 className="cap-title">{c.title}</h3>
                  <p className="home-cap-copy">{c.desc}</p>
                  <div className="cap-tags">{c.tags.map(t => <span key={t} className="cap-tag">{t}</span>)}</div>
                </article>
              ))}
            </div>
            <Link className="home-text-link home-section-link" to="/services">Explore our services <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="home-section home-products" aria-labelledby="products-title">
          <div className="container">
            <SectionHeading eyebrow="Made by Calquors" title={<>Out in the world.<br />In people's hands.</>} id="products-title" description="We build and run our own products, too. Meet the apps and platforms we’ve taken from idea to everyday use." />
            <div className="pc-grid">{PROJECTS.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} featured={p.featured} />)}</div>
            <Link className="home-text-link home-section-link" to="/work">See all our work <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <ProcessSection />

        <section className="home-section home-contact" aria-labelledby="home-contact-title">
          <div className="container">
            <div className="home-contact-card">
              <span className="home-eyebrow">Your next chapter</span>
              <h2 className="home-heading" id="home-contact-title">Let's make<br /><span>something great.</span></h2>
              <p className="home-section-copy">Bring your idea. We'll bring the care, craft, and engineering to make it happen.</p>
              <div className="home-contact-actions"><Link className="home-primary-link" to="/contact">Start a project <span aria-hidden="true">↗</span></Link><Link className="home-text-link" to="/services">Explore services <span aria-hidden="true">›</span></Link></div>
              <p className="home-contact-note">A clear scope, timeline, and quote. Within one business day.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description, id }) {
  return <div className="home-section-header"><span className="home-eyebrow">{eyebrow}</span><h2 className="home-heading" id={id}>{title}</h2><p className="home-section-copy">{description}</p></div>
}

function CapabilityIcon({ kind }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'mobile' && <><rect x="24" y="10" width="32" height="60" rx="9" /><path d="M34 16h12M35 63h10" /><rect x="30" y="27" width="20" height="24" rx="4" strokeOpacity=".35" /></>}
      {kind === 'web' && <><rect x="10" y="17" width="60" height="46" rx="8" /><path d="M10 29h60M19 23h1m5 0h1m5 0h1" /><rect x="18" y="37" width="18" height="18" rx="3" strokeOpacity=".35" /><path d="M44 40h18M44 47h18M44 54h10" strokeOpacity=".6" /></>}
      {kind === 'engineering' && <><rect x="27" y="10" width="26" height="20" rx="5" /><rect x="8" y="50" width="26" height="20" rx="5" /><rect x="46" y="50" width="26" height="20" rx="5" /><path d="M40 30v10M21 50V40h38v10M34 20h12M15 60h12M53 60h12" strokeOpacity=".6" /></>}
      {kind === 'design' && <><rect x="16" y="16" width="48" height="48" rx="13" /><circle cx="40" cy="40" r="14" strokeOpacity=".5" /><path d="m40 26 14 14-14 14-14-14Z" /><circle cx="16" cy="16" r="3" fill="var(--bg-elev)" /><circle cx="64" cy="64" r="3" fill="var(--bg-elev)" /></>}
    </svg>
  )
}

function ProcessSection() {
  const [active, setActive] = useState(0)
  const steps = [
    { title: 'Discover', headline: 'Start with the right questions.', description: 'Workshops, audits, and a written scope. We define what success looks like before a single pixel is drawn.', detail: 'A shared direction. A clear scope.' },
    { title: 'Design', headline: 'Make every interaction count.', description: 'Wireframes, prototypes, and design systems. We explore the details and test interactions before we build.', detail: 'Thoughtful interfaces. Tested ideas.' },
    { title: 'Build', headline: 'Watch your idea become real.', description: 'Two-week sprints and weekly demos. Stay close to the work as we turn the design into software you can use.', detail: 'Weekly progress. Working software.' },
    { title: 'Ship', headline: 'Ready for the real world.', description: 'Store submissions, monitoring, and a 30-day stabilization window. We help your product launch with confidence.', detail: 'A careful launch. Continued support.' },
  ]
  return (
    <section className="home-section home-process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading eyebrow="How we work" title={<>A clear path.<br />From idea to launch.</>} id="process-title" description="You know what's happening, what's next, and why it matters. Every step of the way." />
        <div className="home-process-tabs" role="tablist" aria-label="Our process">
          {steps.map((step, i) => <button key={step.title} id={`process-tab-${i}`} role="tab" aria-selected={active === i} aria-controls="process-panel" tabIndex={active === i ? 0 : -1} className={active === i ? 'active' : ''} onClick={() => setActive(i)} onKeyDown={e => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 3 : (i + (e.key === 'ArrowRight' ? 1 : 3)) % 4; setActive(next); document.getElementById(`process-tab-${next}`)?.focus() } }}><span className="home-step-number">0{i + 1}</span>{step.title}</button>)}
        </div>
        <div className="home-process-panel" id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} tabIndex={0}>
          <div className="home-process-track" aria-hidden="true">{steps.map((s, i) => <span key={s.title} className={i <= active ? 'complete' : ''}><i />{s.title}</span>)}</div>
          <h3>{steps[active].headline}</h3>
          <p>{steps[active].description}</p>
          <span className="home-process-detail">{steps[active].detail}</span>
        </div>
      </div>
    </section>
  )
}
