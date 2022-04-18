import { useNavigate } from 'react-router-dom'
import Planet from '../components/Planet'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = (props) => {
  let navigate = useNavigate()

  const getPlanets = async () => {
    const response = await axios.get(`http://localhost:3001/api/planet/`)
    console.log(response.data)
    props.setPlanets(response.data)
  }

  useEffect(() => {
    getPlanets()
    console.log(props.planets, 'useEffect')
  }, [])

  const surface =
    'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg'
  let orbitRadius = 10
  let orbitSpeed = 5

  return (
    <div>
      <div className="title">
        <h1>Your Journey Begins NOW!</h1>
        <h3>Select Your Destination</h3>
      </div>
      <div className="solar-system">
        <div className="system">
          {props.planets.map((planet, index) => (
            <Planet
              key={index}
              orbitRadius={planet.orbit}
              orbitSpeed={planet.speed}
              zIndex={planet.zIndex}
              planet={planet.id}
              surface={planet.image}
              size={planet.size}
            />
          ))}
          <img
            src="https://i.ibb.co/x5JbPsC/sun.jpg"
            alt="sun"
            style={{
              zIndex: `12`,
              height: '100px',
              width: '100px',
              animation: `Reverse-logo-spin infinite 30s linear`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
