import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { AuthProvider } from './contexts/AuthContext'
import { BookshelfProvider } from './contexts/BookShelfContext'
import './index.css'
import App from './App.js'
import '@/styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <FluentProvider theme={webLightTheme}>
      <BrowserRouter>
      <AuthProvider>
        <BookshelfProvider>
          <App/>
        </BookshelfProvider>
      </AuthProvider>
      </BrowserRouter>

     </FluentProvider>
  </StrictMode>,
)
