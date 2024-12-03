import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import Sign from './Components/ComponentsJs/Sign'
import Login from './Components/ComponentsJs/Login'
import EmailValidation from './Components/ComponentsJs/EmailValidation'
import NotFound from './Components/ComponentsJs/NotFound'
import Home from './Components/ComponentsJs/Home'
import ProtectedRoute from './Components/ComponentsJs/ProtectedRoutes'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/validation" element={<EmailValidation/>} />
          <Route path="/home" element={<Home/>} />
          <Route
            path="/home"
            element={<ProtectedRoute>{<Home />}</ProtectedRoute>}
          />
          <Route path = "/*" element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App