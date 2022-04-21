import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/Nav'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Landing from './pages/Landing'
import PlanetPage from './pages/PlanetPage'
import CommunityDetails from './pages/CommunityDetails'
import Profile from './components/Profile'
import UpdatePassword from './components/UpdatePassword'
import PilgrimProfile from './pages/PilgrimProfile'
import { CheckSession, PasswordUpdate } from './services/Auth'
import './style/App.css'
import './style/Button.css'
import './style/Form.css'
import Mailbox from './components/Mailbox'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [pilgrim, setPilgrim] = useState(null)
  const [planets, setPlanets] = useState([])
  const [planet, setPlanet] = useState('')
  const [planetImages, setPlanetImages] = useState([])
  const [communities, setCommunities] = useState([])
  const [community, setCommunity] = useState('')
  const [pilgrims, setPilgrims] = useState([])
  const [passwordUpdate, setPasswordUpdate] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [comments, setComments] = useState([])
  const [nonUserPilgrim, setNonUserPilgrim] = useState({
    username: '',
    bio: '',
    communityId: null
  })
  const [solarFlare, setSolarFlare] = useState([])
  const [messages, setMessages] = useState([])
  const [averageRating, setAverageRating] = useState([])

  let apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://space-pilgrims.herokuapp.com'
      : 'http://localhost:3001'

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

  const nasaCall = async () => {
    const response = await axios.get(
      `https://api.nasa.gov/DONKI/FLR?startDate=2022-04-18&endDate=2022-12-31&api_key=p2f2NgOuddrU9P5FS38RB0ueSiciWJfAcF7PIlc8`
    )
    setSolarFlare(response.data)
  }

  const postRating = async (rating, planetId) => {
    const response = await axios.post(
      `${apiUrl}/api/rating/${planetId}`,
      rating
    )
    getAverageRating(planetId)
  }

  const getAverageRating = async (planetId) => {
    const response = await axios.get(`${apiUrl}/api/rating/${planetId}`)
    let sum = 0
    for (let i = 0; i < response.data.length; i++) {
      sum += response.data[i]
    }
    setAverageRating(sum / response.data.length)
  }

  const getPlanetImages = async (planetId) => {
    const response = await axios.get(`${apiUrl}/api/planetImage/${planetId}`)
    setPlanetImages(response.data)
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
            element={
              <Home
                setPlanets={setPlanets}
                planets={planets}
                nasaCall={nasaCall}
                solarFlare={solarFlare}
                pilgrim={pilgrim}
              />
            }
          />
          <Route
            path="/planetpage/:planetId"
            element={
              <PlanetPage
                planet={planet}
                setPlanet={setPlanet}
                communities={communities}
                setCommunities={setCommunities}
                postRating={postRating}
                getPlanetImages={getPlanetImages}
                planetImages={planetImages}
                getAverageRating={getAverageRating}
                averageRating={averageRating}
                pilgrim={pilgrim}
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
            element={
              <Profile
                pilgrim={pilgrim}
                setPilgrim={setPilgrim}
                community={community}
                setCommunity={setCommunity}
                planet={planet}
                setPlanet={setPlanet}
                messages={messages}
                setMessages={setMessages}
              />
            }
          />
          <Route
            path="/profile/:pilgrimId"
            element={
              <PilgrimProfile
                pilgrim={pilgrim}
                nonUserPilgrim={nonUserPilgrim}
                setNonUserPilgrim={setNonUserPilgrim}
                community={community}
                setCommunity={setCommunity}
                planet={planet}
                setPlanet={setPlanet}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
