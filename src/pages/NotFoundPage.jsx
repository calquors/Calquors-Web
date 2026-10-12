import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="page-header reveal">
            <span className="eyebrow">404</span>
            <h1 className="h-display" style={{ marginTop: 16 }}>Page not found.</h1>
            <p className="body-lg" style={{ marginTop: 24 }}>
              This page doesn't exist — but these do.
            </p>
            <div className="row gap-3" style={{ marginTop: 32, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" to="/">Home <span className="btn-arrow" /></Link>
              <Link className="btn btn-ghost" to="/work">Our products</Link>
              <Link className="btn btn-ghost" to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
