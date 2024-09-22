// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './global.css'
// import {BrowserRouter as Router} from 'react-router-dom'
// import AppRoutes from './AppRoutes'
// import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
// import { Provider } from 'react-redux'
// import store from './hooks/app/store'


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Router>
//         <Auth0ProviderWithNavigate>
//           <Provider store={store}>
//             <AppRoutes />
//           </Provider>
//         </Auth0ProviderWithNavigate>
//     </Router>
//   </React.StrictMode>
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import ApiWrapper from './apiMainWrapper';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiWrapper />
  </React.StrictMode>
);
