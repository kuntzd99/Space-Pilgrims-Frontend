import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Landing from './pages/Landing'
import PlanetPage from './pages/PlanetPage'
import CommunityDetails from './pages/CommunityDetails'
import Profile from './components/Profile'
import UpdatePassword from './components/UpdatePassword'
import { CheckSession, PasswordUpdate } from './services/Auth'
import './style/App.css'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [pilgrim, setPilgrim] = useState(null)
  const [planets, setPlanets] = useState([])
  const [planet, setPlanet] = useState('')
  const [communities, setCommunities] = useState([])
  const [community, setCommunity] = useState('')
  const [pilgrims, setPilgrims] = useState([])
  const [passwordUpdate, setPasswordUpdate] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [comments, setComments] = useState([])

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
          <Route
            path="/"
            element={
              <Landing
                setPilgrim={setPilgrim}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
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
            path="/home"
            element={<Home setPlanets={setPlanets} planets={planets} />}
          />
          <Route
            path="/planetpage/:planetId"
            element={
              <PlanetPage
                planet={planet}
                setPlanet={setPlanet}
                communities={communities}
                setCommunities={setCommunities}
                // authenticated={authenticated}
              />
            }
          />
          <Route
            path="/communitypage/:communityId"
            element={
              <CommunityDetails
                community={community}
                setCommunity={setCommunity}
                pilgrims={pilgrims}
                setPilgrims={setPilgrims}
                pilgrim={pilgrim}
                setPilgrim={setPilgrim}
                planet={planet}
                setPlanet={setPlanet}
                comments={comments}
                setComments={setComments}
              />
            }
          />

          <Route
            path="/update/:pilgrim_id"
            element={
              <UpdatePassword
                pilgrim={pilgrim}
                setPilgrim={setPilgrim}
                newPassword={newPassword}
                confirmNewPassword={confirmNewPassword}
                setPasswordUpdate={setPasswordUpdate}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile pilgrim={pilgrim} setPilgrim={setPilgrim} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
