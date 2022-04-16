import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import PlanetPage from './pages/PlanetPage'
import { CheckSession } from './services/Auth'
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
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                setPilgrim={setPilgrim}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/planetpage"
            element={
              <PlanetPage pilgrim={pilgrim} authenticated={authenticated} />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
