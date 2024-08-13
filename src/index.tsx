import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import baseStyle from './styles/globalStyles'
import { AlertContextProvider } from '@contexts/Alertcontext'
import AuthGuard from '@components/auth/AuthGuard'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={baseStyle} />
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <AuthGuard>
          <App />
        </AuthGuard>
      </AlertContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
