import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../data/site'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    services: [], budget: '', timeline: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState({})

  const services = ['Mobile app', 'Web platform', 'Engineering', 'Design', 'AI / data']
  const budgets = ['< $25k', '$25–75k', '$75–200k', '$200k+', 'Not sure']
  const timelines = ['ASAP', '1–3 months', '3–6 months', 'Exploring']

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: undefined }))
  }

  const toggleService = (s) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter(x => x !== s)
        : [...f.services, s],
    }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email'
    if (form.services.length === 0) e.services = 'Pick at least one'
    if (!form.budget) e.budget = 'Required'
    if (!form.message.trim()) e.message = 'Tell us a bit about it'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // No backend yet: open the visitor's email app with the brief pre-filled,
  // addressed to support. They press send, and it lands in our inbox.
  const mailtoHref = () => {
    const subject = `New project — ${form.name}${form.company ? ` (${form.company})` : ''}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      `Needs: ${form.services.join(', ')}`,
      `Budget: ${form.budget}`,
      form.timeline && `Timeline: ${form.timeline}`,
      '',
      form.message,
    ].filter(l => l !== '' && l !== undefined && l !== false).join('\n')
    return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submit = (ev) => {
    ev.preventDefault()
    setTouched({ name: true, email: true, services: true, budget: true, message: true })
    if (validate()) {
      window.location.href = mailtoHref()
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="page contact-page">
        <section className="section">
          <div className="container">
            <div className="contact-success reveal">
              <div className="success-mark">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                  <path d="M5 12 L10 17 L19 7" stroke="var(--accent-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="eyebrow">Almost there</span>
              <h1 className="h-display" style={{ marginTop: 16, maxWidth: '14ch' }}>
                Hit <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>send</em><br />and we're on it.
              </h1>
              <p className="body-lg" style={{ marginTop: 24 }}>
                Thanks, <strong style={{ color: 'var(--fg)' }}>{form.name}</strong>. Your email app
                should have opened with your brief ready to go — just press send. We reply within one
                business day with a written scope, timeline and quote.
              </p>
              <p className="body" style={{ marginTop: 16 }}>
                Nothing opened? <a className="text-accent" style={{ textDecoration: 'underline' }} href={mailtoHref()}>Open it again</a> or
                write to <a className="text-accent" style={{ textDecoration: 'underline' }} href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
              </p>
              <div className="row gap-3" style={{ marginTop: 40, justifyContent: 'center' }}>
                <Link className="btn btn-primary" to="/">
                  Back to home <span className="btn-arrow" />
                </Link>
                <Link className="btn btn-ghost" to="/work">
                  Browse work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page contact-page">
      <section className="section-tight" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="page-header reveal">
            <span className="eyebrow">Contact / Start a project</span>
            <h1 className="h-display" style={{ marginTop: 16, maxWidth: '12ch' }}>
              Let's build<br /><em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>something</em>.
            </h1>
            <p className="body-lg" style={{ marginTop: 24 }}>
              Tell us about your project. We respond within one business day with a clear
              scope, timeline, and a fixed quote — no sales calls required.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="contact-grid">
            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="field-row">
                <Field label="Your name" id="name" required error={touched.name && errors.name} value={form.name} onChange={v => update('name', v)} onBlur={() => setTouched(t => ({ ...t, name: true }))} placeholder="Jane Doe" />
                <Field label="Email" id="email" type="email" required error={touched.email && errors.email} value={form.email} onChange={v => update('email', v)} onBlur={() => setTouched(t => ({ ...t, email: true }))} placeholder="jane@company.com" />
              </div>

              <Field label="Company" id="company" value={form.company} onChange={v => update('company', v)} placeholder="Acme Co. (optional)" />

              <FieldGroup label="What do you need?" required error={touched.services && errors.services}>
                <div className="chip-row">
                  {services.map(s => (
                    <button type="button" key={s} className={`chip ${form.services.includes(s) ? 'on' : ''}`} onClick={() => { toggleService(s); setTouched(t => ({ ...t, services: true })) }}>
                      {form.services.includes(s) && <span className="chip-check">✓</span>}
                      {s}
                    </button>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup label="Budget" required error={touched.budget && errors.budget}>
                <div className="seg">
                  {budgets.map(b => (
                    <button type="button" key={b} aria-pressed={form.budget === b} className={`seg-btn ${form.budget === b ? 'on' : ''}`} onClick={() => { update('budget', b); setTouched(t => ({ ...t, budget: true })) }}>{b}</button>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup label="Timeline">
                <div className="seg">
                  {timelines.map(t => (
                    <button type="button" key={t} aria-pressed={form.timeline === t} className={`seg-btn ${form.timeline === t ? 'on' : ''}`} onClick={() => update('timeline', t)}>{t}</button>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup label="Tell us about it" required error={touched.message && errors.message}>
                <textarea
                  className={`ta ${touched.message && errors.message ? 'err' : ''}`}
                  rows={6}
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, message: true }))}
                  placeholder="What are you trying to build? Who's it for? What problem are you solving?"
                />
                <div className="mono text-dim" style={{ textAlign: 'right', marginTop: 6 }}>{form.message.length} chars</div>
              </FieldGroup>

              <button type="submit" className="btn btn-primary contact-submit">
                Send message <span className="btn-arrow" />
              </button>
            </form>

            <aside className="contact-side">
              <div className="contact-side-block">
                <span className="mono text-dim">EMAIL</span>
                <a href={`mailto:${COMPANY.email}`} className="contact-link">{COMPANY.email}</a>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">RESPONSE TIME</span>
                <span style={{ fontSize: 18 }}>Within 1 business day</span>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">STUDIO</span>
                <span style={{ fontSize: 14, color: 'var(--fg-muted)' }}>{COMPANY.country}<br />Working with clients worldwide</span>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">COMPANY</span>
                <Link className="contact-link" to="/company">{COMPANY.legalName} →</Link>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">OUR PRODUCTS</span>
                <Link className="contact-link" to="/work">OmegleVC, Klyq, Revfit →</Link>
              </div>
              <div className="contact-availability">
                <div className="row gap-2 center" style={{ marginBottom: 8 }}>
                  <span className="avail-dot" />
                  <span className="mono">ACCEPTING NEW PROJECTS</span>
                </div>
                <p className="body" style={{ fontSize: 13 }}>
                  We're taking on new builds now — tell us what you're shipping.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({ label, id, type = 'text', required, error, value, onChange, onBlur, placeholder }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-accent">*</span>}
        {error && <span className="field-error mono">{error}</span>}
      </label>
      <input
        id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`input ${error ? 'err' : ''}`}
      />
    </div>
  )
}

function FieldGroup({ label, required, error, children }) {
  return (
    <div className="field">
      <div className="field-label">
        {label} {required && <span className="text-accent">*</span>}
        {error && <span className="field-error mono">{error}</span>}
      </div>
      {children}
    </div>
  )
}
