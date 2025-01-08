import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { ContextProvider } from './context/ContextProvider'
import router from "./router"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={ router } />
    </ContextProvider>
  </StrictMode>,
)
