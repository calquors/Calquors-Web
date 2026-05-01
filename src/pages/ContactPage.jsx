import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ContactPage() {
  const navigate = useNavigate()
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

  const submit = (ev) => {
    ev.preventDefault()
    setTouched({ name: true, email: true, services: true, budget: true, message: true })
    if (validate()) setSubmitted(true)
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
              <span className="eyebrow">Message received</span>
              <h1 className="h-display" style={{ marginTop: 16, maxWidth: '14ch' }}>
                Got it. We'll<br />be in <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>touch</em>.
              </h1>
              <p className="body-lg" style={{ marginTop: 24 }}>
                Thanks, <strong style={{ color: 'var(--fg)' }}>{form.name}</strong>. Someone from the
                Calquors team will reply within one business day with a written scope, timeline,
                and quote. Look out for an email at <span className="mono text-accent">{form.email}</span>.
              </p>
              <div className="row gap-3" style={{ marginTop: 40, justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                  Back to home <span className="btn-arrow" />
                </button>
                <button className="btn btn-ghost" onClick={() => navigate('/work')}>
                  Browse work
                </button>
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

              <div className="field-row">
                <FieldGroup label="Budget" required error={touched.budget && errors.budget}>
                  <div className="seg">
                    {budgets.map(b => (
                      <button type="button" key={b} className={`seg-btn ${form.budget === b ? 'on' : ''}`} onClick={() => { update('budget', b); setTouched(t => ({ ...t, budget: true })) }}>{b}</button>
                    ))}
                  </div>
                </FieldGroup>
              </div>

              <FieldGroup label="Timeline">
                <div className="seg">
                  {timelines.map(t => (
                    <button type="button" key={t} className={`seg-btn ${form.timeline === t ? 'on' : ''}`} onClick={() => update('timeline', t)}>{t}</button>
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
                <a href="mailto:hello@calquors.studio" className="contact-link">hello@calquors.studio</a>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">RESPONSE TIME</span>
                <span style={{ fontSize: 18 }}>Within 1 business day</span>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">LOCATIONS</span>
                <span style={{ fontSize: 14, color: 'var(--fg-muted)' }}>Remote-first<br />EU · Asia · Americas</span>
              </div>
              <div className="contact-side-block">
                <span className="mono text-dim">SUB-BRAND</span>
                <span className="contact-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/studio')}>Rivelo Labs →</span>
              </div>
              <div className="contact-availability">
                <div className="row gap-2 center" style={{ marginBottom: 8 }}>
                  <span className="avail-dot" />
                  <span className="mono">ACCEPTING NEW PROJECTS</span>
                </div>
                <p className="body" style={{ fontSize: 13 }}>
                  Currently booking engagements starting June 2026.
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
