import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { Provider } from 'react-redux'
import store from './hooks/app/store'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        <Provider store={store}>
          <Auth0ProviderWithNavigate>
            <AppRoutes />
          </Auth0ProviderWithNavigate>
        </Provider>
    </Router>
  </React.StrictMode>,
)
