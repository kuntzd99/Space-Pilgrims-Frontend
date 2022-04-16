import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Community from '../components/Community'

const PlanetPage = (props) => {
  const { planetId } = useParams()

  const getPlanet = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/planet/${planetId}`
    )
    console.log(response.data[0])
    props.setPlanet(response.data[0])
  }

  useEffect(() => {
    getPlanet()
  }, [])

  return (
    <div>
      <h1>{props.planet.name}</h1>
      <img src={props.planet.image} alt={props.planet.name} />
      <p>{props.planet.description}</p>
      <h3>Population: {props.planet.population}</h3>
      <h1>Communities:</h1>
      <Community
        communities={props.communities}
        setCommunities={props.setCommunities}
      />
    </div>
  )
}

export default PlanetPage
