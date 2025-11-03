import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import 'primereact/resources/themes/saga-orange/theme.css'
//import 'primereact/resources/themes/vela-orange/theme.css' modo oscuro

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)