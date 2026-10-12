import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import SEOHead from './components/SEOHead'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ServicesPage from './pages/ServicesPage'
import StudioPage from './pages/StudioPage'
import ContactPage from './pages/ContactPage'
import CompanyPage from './pages/CompanyPage'
import ProjectPage from './pages/ProjectPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function AppInner() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <SEOHead />
      <div className="bg-grid" />
      <div className="bg-noise" />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
