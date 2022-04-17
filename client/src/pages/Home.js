import { useNavigate } from 'react-router-dom'
import Planet from '../components/Planet'
import { useState } from 'react'

const Home = () => {
  let navigate = useNavigate()

  const planets = [9, 8, 7, 6, 5, 4, 3, 2, 1]
  const surface =
    'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg'
  let orbitRadius = 10
  let orbitSpeed = 5

  return (
    <div className="solar-system">
      <div className="system">
        {planets.map((planet, index) => (
          <Planet
            key={index}
            orbitRadius={(orbitRadius += 5)}
            orbitSpeed={(orbitSpeed += 10)}
            index={index}
            planet={planet}
            surface={surface}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
