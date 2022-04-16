import { useNavigate } from 'react-router-dom'
import SolarSystem from '../assets/SolarSystemImage.webp'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
      <img className="homeImage" src={SolarSystem} alt="welcome" />

      <section className="welcome-signin">
        <button onClick={() => navigate('/login')}>Get Started</button>
      </section>
    </div>
  )
}

export default Home
