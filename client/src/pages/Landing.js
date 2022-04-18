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
      <div className="rocket-sun">
        <img
          src="https://i.ibb.co/x5JbPsC/sun.jpg"
          alt="sun"
          style={{
            zIndex: `12`,
            height: '100px',
            width: '100px',
            animation: `Reverse-logo-spin infinite 30s linear`,
            borderRadius: `50%`
          }}
        />
        <div className="rocket-orbit">
          <img
            className="pilgrim-rocket"
            src="https://i.ibb.co/0yZwSVz/Pilgrim-Rocket.jpg"
            alt="Pilgrim Rocket"
          />
        </div>
      </div>
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
