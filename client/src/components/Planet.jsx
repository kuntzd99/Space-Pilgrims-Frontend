import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const Planet = ({orbitRadius, orbitSpeed, planet, surface}) => {
  let navigate = useNavigate()
  
  return (
    <div className="orbit" 
      style={{
        height: `${orbitRadius}vh`, 
        width: `${orbitRadius}vh`,  
        borderRadius: "50%", 
        zIndex: `${planet}`,
        animation: `App-logo-spin infinite 95s linear`
        }}>
      <div className="planet" 
        style={{
          backgroundImage: `url(https://i.ibb.co/X3Wmq2D/saturn.jpg)`,
          backgroundSize: 'cover',
          height: '30px', 
          width: '30px', 
          borderRadius: "50%"
          }} 
        onClick={() => navigate(`/planetpage/${planet}`)}>
      </div>
    </div>
  )
}

export default Planet
