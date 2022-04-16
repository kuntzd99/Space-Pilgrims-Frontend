import { useNavigate } from 'react-router-dom'
import SolarSystem from '../assets/SolarSystemImage.webp'

const Landing = () => {
  let navigate = useNavigate()

  return (
    <div className="landing-container col">
      <img className="landingImage" src={SolarSystem} alt="welcome" />

      <section className="welcome-signin">
        <button className="landingBtn" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </section>
    </div>
  )
}

export default Landing
