import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Community from '../components/Community'
import PlanetImage from '../components/PlanetImage'
import Modal from '../components/Modal'

const PlanetPage = (props) => {
  const { planetId } = useParams()

  const [hasRated, setHasRated] = useState(true)
  const [planetInfo, setPlanetInfo] = useState({})
  const [moons, setMoons] = useState(0)

  let apiUrl = 'https://space-pilgrims.herokuapp.com'

  const kelvinToFah = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32
  }

  const getPlanet = async () => {
    const response = await axios.get(`${apiUrl}/api/planet/${planetId}`)
    props.setPlanet(response.data[0])
    const infoResponse = await axios.get(
      `https://api.le-systeme-solaire.net/rest/bodies/${response.data[0].frenchName}`
    )

    //Some planets have moons = null
    infoResponse.data.moons
      ? setMoons(infoResponse.data.moons.length)
      : setMoons(0)

    setPlanetInfo(infoResponse.data)
  }

  const handleRating = (rating) => {
    props.postRating({ rating: rating }, planetId)
    //Turning the ability to rate on that planet off.
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
          <div className="planet-avg">
            Planet's Rating:
            {/* //If there isn't average rating set it equal to 0. */}
            {props.averageRating
              ? parseFloat(props.averageRating).toFixed(1)
              : 0}{' '}
            / 5
          </div>
          <div className="planet-rating">
            <div>Rate: </div>
            {/* //Checking to see if the user has rated already. */}
            <a onClick={hasRated ? () => handleRating(1) : null}>????</a>
            <a onClick={hasRated ? () => handleRating(2) : null}>????</a>
            <a onClick={hasRated ? () => handleRating(3) : null}>????</a>
            <a onClick={hasRated ? () => handleRating(4) : null}>????</a>
            <a onClick={hasRated ? () => handleRating(5) : null}>????</a>
          </div>
          {props.planet.population < 0 ? (
            <h3 className="planet-population">Population: 0</h3>
          ) : (
            <h3 className="planet-population">
              Population: {props.planet.population}
            </h3>
          )}
          {/* // Preventing access on planet 9 to unauthorized users. */}
          {props.planet.id === 9 ? (
            <div></div>
          ) : (
            // Information coming from the API on each planet.
            <div className="planet-info-reel">
              <div className="planet-info-child">
                <div className="planet-info-data-title">Avg Temp: </div>
                <div className="planet-info-data">
                  {kelvinToFah(planetInfo.avgTemp).toFixed(1)}??F
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
                  {(planetInfo.equaRadius / 1.609).toFixed(1)} mi
                </div>
              </div>
            </div>
          )}
          {/* // Showing images of the planet based on which planet is selected. */}
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
            openModal={props.openModal}
            setOpenModal={props.setOpenModal}
            setErrorMessage={props.setErrorMessage}
          />
        </div>
      )}
    </div>
  )
}

export default PlanetPage
