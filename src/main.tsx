import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid rgba(255, 107, 0, 0.2)',
        },
        success: {
          iconTheme: {
            primary: '#FF6B00',
            secondary: '#fff',
          },
        },
      }}
    />
  </>,
)
