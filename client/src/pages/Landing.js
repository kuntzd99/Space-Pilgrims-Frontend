import { useNavigate } from 'react-router-dom'
import SolarSystem from '../assets/SolarSystemImage.webp'
import Login from './Login'

const Landing = () => {
  let navigate = useNavigate()

  return (
    <div className="landing">
      <h1>Welcome to Space Pilgrims!</h1>
      <h3>(Add some description of the website)</h3>
      <div>Orbit</div>
      <button onClick={() => navigate('/register')}>Register</button>
      <Login />
    </div>
  )
}

export default Landing
