import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create root element
const rootElement = document.getElementById('root');

// Check if root element exists
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create root and render app
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
