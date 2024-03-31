import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppConfig } from './types/AppConfig.ts'

import './styles/index.css'

const config: AppConfig = {
  canvasWidth: 1239, // Example value for x attribute
  canvasHeight: 710, // Example value for y attribute
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App config={config}/>
  </React.StrictMode>,
)
