import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './pages.css'
import './home-polish.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Pages are pre-rendered at build time, so hydrate when HTML is already there.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
