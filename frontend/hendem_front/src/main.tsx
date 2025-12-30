import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/Alerts'
import './index.css'
import App from './App'

// Debug: print React version to ensure single copy is used
try {
  // React exposes version
  // eslint-disable-next-line no-console
  console.log('React version:', (React as any).version)
} catch (e) {
  // ignore
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
