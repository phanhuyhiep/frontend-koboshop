import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <Analytics />
        <Toaster position='top-right' reverseOrder={false} />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
