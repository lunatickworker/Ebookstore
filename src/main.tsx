import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { LibraryProvider } from './contexts/LibraryContext.tsx'
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LibraryProvider>
        <App />
        <Toaster richColors position="top-right" />
      </LibraryProvider>
    </AuthProvider>
  </React.StrictMode>,
)