import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContractorDemo from './demos/ContractorDemo.jsx'
import ConsultantDemo from './demos/ConsultantDemo.jsx'
import ShopDemo from './demos/ShopDemo.jsx'
import Success from './Success.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo/contractor" element={<ContractorDemo />} />
        <Route path="/demo/consultant" element={<ConsultantDemo />} />
        <Route path="/demo/shop" element={<ShopDemo />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
