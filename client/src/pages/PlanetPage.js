import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Community from '../components/Community'
import PlanetImage from '../components/PlanetImage'

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
    props.getPlanetImages(planetId)
  }, [])

  return (
    <div className="planet-page">
      <h1 className="planet-name">{props.planet.name}</h1>
      <img
        className="planet-image"
        src={props.planet.highRes}
        alt={props.planet.name}
      />
      <p className="planet-description">Text: {props.planet.description}</p>
      <div className="planet-rating">
        <div>Rate: </div>
        <a onClick={() => props.postRating(1, planetId)}>🪐</a>
        <a onClick={() => console.log('planet2')}>🪐</a>
        <a onClick={() => console.log('planet1')}>🪐</a>
        <a onClick={() => console.log('planet1')}>🪐</a>
        <a onClick={() => console.log('planet1')}>🪐</a>
      </div>
      <h3 className="planet-population">
        Population: {props.planet.population}
      </h3>
      <div className="carousel">
        {props.planetImages.map((image) => (
          <PlanetImage key={image.id} image={image.image} />
        ))}
      </div>
      <h1>Communities:</h1>

      <Community
        communities={props.communities}
        setCommunities={props.setCommunities}
        planetId={planetId}
        pilgrim={props.pilgrim}
      />
    </div>
  )
}

export default PlanetPage
