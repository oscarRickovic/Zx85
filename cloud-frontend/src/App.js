import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sign from './Componenets/ComonentsJs/Sign'
import './App.css'
import { useEffect, useState } from 'react'
import Login from './Componenets/ComonentsJs/Login'
import EmailValidation from './Componenets/ComonentsJs/EmailValidation'
import NotFound from './Componenets/ComonentsJs/NotFound'
import Home from './Componenets/ComonentsJs/Home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/validation" element={<EmailValidation/>} />
          <Route path="/home" element={<Home/>} />
          <Route path = "/*" element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App