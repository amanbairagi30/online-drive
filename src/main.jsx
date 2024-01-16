import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { FileEntityProvider } from './context/FileEntityContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <FileEntityProvider>
        <App />
      </FileEntityProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
