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
import Modal from './components/Modal'
import { CheckSession } from './services/Auth'
import './style/App.css'
import './style/Button.css'
import './style/Form.css'
import './style/Modal.css'

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
  const [openModal, setOpenModal] = useState(false) // Set modal open or close
  const [errorMessage, setErrorMessage] = useState('') //Error message that appear son Modal

  // Universal API call for entire app
  let apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://space-pilgrims.herokuapp.com'
      : 'http://localhost:3001'

  const handleLogout = () => {
    setPilgrim(null) //Once logged out, the user no longer has pilgrim priviledges
    toggleAuthenticated(false) // Once logged out, the user is no longer authenticated
    localStorage.clear()
  }

  // Check each time if the user is a pilgrim and authenticated to make certain commands
  const checkToken = async () => {
    const pilgrim = await CheckSession()
    setPilgrim(pilgrim)
    toggleAuthenticated(true)
  }
  //Nasa API call to get Solar Flare info
  const nasaCall = async () => {
    const response = await axios.get(
      `https://api.nasa.gov/DONKI/FLR?startDate=2022-04-18&endDate=2022-12-31&api_key=p2f2NgOuddrU9P5FS38RB0ueSiciWJfAcF7PIlc8`
    )
    setSolarFlare(response.data)
  }

  // Post request API to rate a planet and set the average of the ratings
  const postRating = async (rating, planetId) => {
    const response = await axios.post(
      `${apiUrl}/api/rating/${planetId}`,
      rating
    )
    getAverageRating(planetId)
  }

  //Get the average of the ratings on each planet
  const getAverageRating = async (planetId) => {
    const response = await axios.get(`${apiUrl}/api/rating/${planetId}`)
    let sum = 0
    for (let i = 0; i < response.data.length; i++) {
      sum += response.data[i]
    }
    setAverageRating(sum / response.data.length)
  }

  //Axios call to get all planet images from the backend
  const getPlanetImages = async (planetId) => {
    const response = await axios.get(`${apiUrl}/api/planetImage/${planetId}`)
    setPlanetImages(response.data)
  }

  // Verify token
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      {/* Call the modall on the app and set the message the modal returns */}

      {openModal && <Modal setOpenModal={setOpenModal} text={errorMessage} />}

      {/* Passing props into the various pages and components */}

      {/* Pass Props into the Nav Bar */}
      <Nav
        authenticated={authenticated}
        pilgrim={pilgrim}
        handleLogout={handleLogout}
      />
      {/* Main Pages Routes, with the states being passed into them */}
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
                openModal={openModal}
                setOpenModal={setOpenModal}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
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
                openModal={openModal}
                setOpenModal={setOpenModal}
                setErrorMessage={setErrorMessage}
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
                openModal={openModal}
                setOpenModal={setOpenModal}
                setErrorMessage={setErrorMessage}
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
                openModal={openModal}
                setOpenModal={setOpenModal}
                setErrorMessage={setErrorMessage}
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
