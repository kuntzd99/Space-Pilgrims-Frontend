import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Community from '../components/Community'
import PlanetImage from '../components/PlanetImage'

const PlanetPage = (props) => {
  const { planetId } = useParams()

  const [hasRated, setHasRated] = useState(true)
  const [planetInfo, setPlanetInfo] = useState({})
  const [moons, setMoons] = useState(0)

  let apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://space-pilgrims.herokuapp.com'
      : 'http://localhost:3001'

  const kelvinToFah = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32
  }

  const getPlanet = async () => {
    const response = await axios.get(`${apiUrl}/api/planet/${planetId}`)
    props.setPlanet(response.data[0])
    const infoResponse = await axios.get(
      `https://api.le-systeme-solaire.net/rest/bodies/${response.data[0].frenchName}`
    )
    infoResponse.data.moons
      ? setMoons(infoResponse.data.moons.length)
      : setMoons(0)

    setPlanetInfo(infoResponse.data)
  }

  const handleRating = (rating) => {
    props.postRating({ rating: rating }, planetId)
    setHasRated(false)
  }

  useEffect(() => {
    getPlanet()
    props.getPlanetImages(planetId)
    props.getAverageRating(planetId)
  }, [])

  return (
    <div>
      {parseInt(planetId) === 9 &&
      (props.pilgrim === null || props.pilgrim.admin !== true) ? (
        <h1 style={{ color: 'red' }}>ERROR: NOT AUTHORIZED</h1>
      ) : (
        <div className="planet-page">
          <h1 className="planet-name">{props.planet.name}</h1>
          <img
            className="planet-image"
            src={props.planet.highRes}
            alt={props.planet.name}
          />
          <p className="planet-description">Text: {props.planet.description}</p>
          <div>
            Planet's Rating:{' '}
            {props.averageRating
              ? parseFloat(props.averageRating).toFixed(1)
              : 0}{' '}
            / 5
          </div>
          <div className="planet-rating">
            <div>Rate: </div>
            <a onClick={hasRated ? () => handleRating(1) : null}>🪐</a>
            <a onClick={hasRated ? () => handleRating(2) : null}>🪐</a>
            <a onClick={hasRated ? () => handleRating(3) : null}>🪐</a>
            <a onClick={hasRated ? () => handleRating(4) : null}>🪐</a>
            <a onClick={hasRated ? () => handleRating(5) : null}>🪐</a>
            {/* <button onClick={() => props.getAverageRating(planetId)}>
            Get Rating
          </button> */}
          </div>
          <h3 className="planet-population">
            Population: {props.planet.population}
          </h3>
          {props.planet.id === 9 ? (
            <div></div>
          ) : (
            <div className="planet-info-reel">
              <div className="planet-info-child">
                <div className="planet-info-data-title">Avg Temp: </div>
                <div className="planet-info-data">
                  {kelvinToFah(planetInfo.avgTemp).toFixed(1)}°F
                </div>
              </div>
              <div className="planet-info-child">
                <div className="planet-info-data-title">Gravity: </div>
                <div className="planet-info-data">
                  {(planetInfo.gravity / 9.8).toFixed(1)} G
                </div>
              </div>
              <div className="planet-info-child">
                <div className="planet-info-data-title">Moons: </div>
                <div className="planet-info-data">{moons}</div>
              </div>
              <div className="planet-info-child">
                <div className="planet-info-data-title">Radius: </div>
                <div className="planet-info-data">
                  {planetInfo.equaRadius} m
                </div>
              </div>
            </div>
          )}
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
      )}
    </div>
  )
}

export default PlanetPage
