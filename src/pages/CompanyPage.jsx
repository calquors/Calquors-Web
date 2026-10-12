import { Link } from 'react-router-dom'
import { COMPANY } from '../data/site'
import { PROJECTS } from '../data/projects'
import { COMPANY_FAQ } from '../data/company'

export default function CompanyPage() {
  return (
    <div className="page company-page">
      <section className="section-tight" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <nav className="crumbs mono" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span aria-current="page">Company</span>
          </nav>
          <div className="page-header reveal">
            <span className="eyebrow">Company profile</span>
            <h1 className="h-display company-title" style={{ marginTop: 16 }}>
              Calquors Private&nbsp;Limited
            </h1>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: '62ch' }}>
              <strong style={{ color: 'var(--fg)' }}>Calquors Private Limited</strong> — also
              written <strong style={{ color: 'var(--fg)' }}>Calquors Pvt Ltd</strong> — is the
              company behind Calquors, a product studio in India.
              We design, build and run mobile apps and web platforms, including OmegleVC and Klyq
              on Google Play.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="company-grid">
            <dl className="facts">
              <Fact k="Legal name" v={COMPANY.legalName} />
              <Fact k="Also known as" v="Calquors · Calquors Pvt Ltd · Calquors Studio" />
              <Fact k="Company type" v="Private limited company, India" />
              <Fact k="Headquarters" v={COMPANY.location} />
              <Fact k="Founded" v="2021" />
              <Fact k="What we do" v="Mobile apps · Web platforms · Backend engineering · Product design" />
              <Fact k="Email" v={<a href={`mailto:${COMPANY.email}`} className="text-accent">{COMPANY.email}</a>} />
              <Fact k="Website" v={<a href="https://calquors.com" className="text-accent">calquors.com</a>} />
            </dl>

            <aside className="company-side">
              <span className="mono text-dim">VERIFIED PUBLISHER</span>
              <p className="body" style={{ marginTop: 10 }}>
                Our Android apps are listed on Google Play under the developer name{' '}
                <strong style={{ color: 'var(--fg)' }}>CALQUORS PRIVATE LIMITED</strong>.
              </p>
              <ul className="company-apps">
                {PROJECTS.map(p => (
                  <li key={p.slug}>
                    <Link to={`/work/${p.slug}`}>{p.name}</Link>
                    <span className="mono text-dim">{p.platforms.join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 className="h1" style={{ marginTop: 12, maxWidth: '20ch' }}>
              Questions about Calquors Private Limited
            </h2>
          </div>
          <div className="faq">
            {COMPANY_FAQ.map((f, i) => (
              <details key={f.q} className="faq-item" open={i === 0}>
                <summary>
                  <h3>{f.q}</h3>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row between center" style={{ flexWrap: 'wrap', gap: 24 }}>
            <h2 className="h1" style={{ maxWidth: '20ch' }}>Work with Calquors.</h2>
            <Link className="btn btn-primary" to="/contact">
              Contact us <span className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Fact({ k, v }) {
  return (
    <div className="fact">
      <dt className="mono">{k}</dt>
      <dd>{v}</dd>
    </div>
  )
}
