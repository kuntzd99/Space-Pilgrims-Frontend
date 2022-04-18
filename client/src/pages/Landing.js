import { useNavigate } from 'react-router-dom'
import SolarSystem from '../assets/SolarSystemImage.webp'
import Login from './Login'

const Landing = ({ setPilgrim, toggleAuthenticated }) => {
  let navigate = useNavigate()

  return (
    <div className="landing">
      <div className="landing-text">
        <h1>Welcome to Space Pilgrims!</h1>
        <h3>(Add some description of the website)</h3>
      </div>
      <div>Orbit</div>
      <div className="register-logoIn">
        <Login
          setPilgrim={setPilgrim}
          toggleAuthenticated={toggleAuthenticated}
        />
        <button className="register" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Landing
