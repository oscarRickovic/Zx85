import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sign from './Componenets/ComonentsJs/Sign'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App