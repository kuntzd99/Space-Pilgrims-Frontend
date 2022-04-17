import { useNavigate } from 'react-router-dom'
import Planet from '../components/Planet'
import { useState } from 'react'

const Home = () => {
  let navigate = useNavigate()

  const planets = [9, 8, 7, 6, 5, 4, 3, 2, 1]

  let orbitRadius = 10

  let orbitSpeed = 100

  return (
    <div className="solar-system">
      <div className="system">
        {planets.map((planet, index) => (
          <Planet
            key={index}
            orbitRadius={(orbitRadius += 5)}
            orbitSpeed={(orbitSpeed -= 5)}
            index={index}
            planet={planet}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
