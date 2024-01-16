import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { FileEntityProvider } from './context/FileEntityContext.jsx'
import { NameErrorProvider } from './context/NameErrorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <FileEntityProvider>
        <NameErrorProvider>
          <App />
        </NameErrorProvider>
      </FileEntityProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
