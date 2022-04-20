import { useNavigate } from 'react-router-dom'
import Planet from '../components/Planet'
import SolarFlare from '../components/SolarFlare'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = (props) => {
  let navigate = useNavigate()

  const getPlanets = async () => {
    const response = await axios.get(`http://localhost:3001/api/planet/`)
    props.setPlanets(response.data)
  }

  useEffect(() => {
    getPlanets()
  }, [])

  const surface =
    'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg'
  let orbitRadius = 10
  let orbitSpeed = 5

  return (
    <div>
      <div className="title">
        <h1>Your Journey Begins NOW!</h1>
        <h3>Select Your Destination :</h3>
      </div>
      <div className="solar-system">
        <div className="system">
          {props.planets.map((planet, index) => (
            <Planet
              key={index}
              className="planet"
              orbitRadius={planet.orbit}
              orbitSpeed={planet.speed}
              zIndex={planet.zIndex}
              planet={planet.id}
              surface={planet.image}
              size={planet.size}
              pilgrim={props.pilgrim}
            />
          ))}
          <img
            src="https://i.ibb.co/x5JbPsC/sun.jpg"
            alt="sun"
            onClick={() => props.nasaCall()}
            style={{
              zIndex: `12`,
              height: '100px',
              width: '100px',
              animation: `Reverse-logo-spin infinite 30s linear`,
              borderRadius: `50%`
            }}
          />
        </div>
      </div>
      <div className="solarFlare-container">
        <h1>Solar Flares:</h1>
        {props.solarFlare.map((flare) => (
          <SolarFlare
            key={flare.flrID}
            start={flare.beginTime}
            classType={flare.classType}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
