import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppInner } from './App.jsx'

export { PAGE_SEO, seoFor, SITE_URL } from './seo.js'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppInner />
      </StaticRouter>
    </StrictMode>
  )
}
