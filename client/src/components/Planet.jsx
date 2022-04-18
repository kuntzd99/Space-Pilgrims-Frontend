import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const Planet = ({orbitRadius, orbitSpeed, planet, surface, size, zIndex}) => {
  let navigate = useNavigate()
  
  return (
    <div className="orbit" 
      style={{
        height: `${orbitRadius}vh`, 
        width: `${orbitRadius}vh`,  
        borderRadius: "50%", 
        zIndex: `${zIndex}`,
        animation: `App-logo-spin infinite ${orbitSpeed}s linear`
        }}>
      <div className="planet" 
        style={{
          backgroundImage: `url(${surface})`,
          backgroundSize: 'cover',
          height: `${size}px`, 
          width: `${size}px`, 
          borderRadius: "50%"
          }} 
        onClick={() => navigate(`/planetpage/${planet}`)}>
      </div>
    </div>
  )
}

export default Planet