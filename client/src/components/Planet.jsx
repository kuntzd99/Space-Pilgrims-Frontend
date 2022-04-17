import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const Planet = ({orbitRadius, orbitSpeed, planet}) => {
  let navigate = useNavigate()
  
  return (
    <div className="orbit" 
      style={{
        height: `${orbitRadius}vh`, 
        width: `${orbitRadius}vh`,  
        borderRadius: "50%", 
        zIndex: `${planet}`,
        animation: `App-logo-spin infinite ${orbitSpeed}s linear`
        }}>
      <div className="planet" 
        style={{
          backgroundColor: "green", 
          height: '20px', 
          width: '20px', 
          borderRadius: "50%"
          }} 
        onClick={() => navigate(`/planetpage/${planet}`)}>
      </div>
    </div>
  )
}

export default Planet