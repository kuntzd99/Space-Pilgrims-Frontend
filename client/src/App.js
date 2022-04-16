import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import PlanetPage from './pages/PlanetPage'
import { CheckSession } from './services/Auth'

import logo from './logo.svg'
import './style/App.css'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [pilgrim, setPilgrim] = useState(null)

  const handleLogout = () => {
    setPilgrim(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const pilgrim = await CheckSession()
    setPilgrim(pilgrim)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        pilgrim={pilgrim}
        handleLogout={handleLogout}
      />
      <div className="logo-wrapper" onClick={() => console.log('click big')}>
        <div onClick={() => console.log('click little')}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div onClick={() => console.log('click big')}>
          <img src={logo} className="App-logo-2" alt="logo" />
        </div>
      </div>
      <div className="square_wrapper">
        <div className="blue"></div>
        <div className="red" onClick={() => console.log('click big')}></div>
      </div>
    </div>
  )
}

export default App
