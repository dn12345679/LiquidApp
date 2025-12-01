import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VisualInfo from './page-visualinfo/visualinfo-page.jsx'

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          
        </Route>
        <Route path="/page-visualinfo" element={<VisualInfo/>}>
          
        </Route>
      </Routes>
      
    </BrowserRouter>
  </StrictMode>
)
