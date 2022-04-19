import { useEffect, useState } from 'react'
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
    props.setPlanet(response.data[0])
  }

  useEffect(() => {
    getPlanet()
  }, [])

  return (
    <div className="planet-page">
      <h1 className="planet-name">{props.planet.name}</h1>
      <img
        className="planet-image"
        src="https://i.ibb.co/SnBftkk/Untitled-design-12.png"
        alt={props.planet.name}
      />
      <p className="planet-description">Text: {props.planet.description}</p>
      <h3 className="planet-population">
        Population: {props.planet.population}
      </h3>
      <div className="carousel">
        <div className="child bg-1"></div>
        <div className="child bg-2"></div>
        <div className="child bg-3"></div>
        <div className="child bg-4"></div>
        <div className="child bg-5"></div>
      </div>
      <h1>Communities:</h1>

      <Community
        communities={props.communities}
        setCommunities={props.setCommunities}
        planetId={planetId}
      />
    </div>
  )
}

export default PlanetPage
