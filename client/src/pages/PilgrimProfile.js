import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Profile from '../components/Profile'

const PilgrimProfile = (props) => {
  const { pilgrimId } = useParams()

  const getPilgrimCommunityAndPlanet = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/pilgrim/pilgrims/${pilgrimId}`
    )
    props.setNonUserPilgrim(response.data)
    if (response.data.communityId) {
      const communityResponse = await axios.get(
        `http://localhost:3001/api/community/communities/${response.data.communityId}`
      )
      props.setCommunity(communityResponse.data)
      const planetResponse = await axios.get(
        `http://localhost:3001/api/planet/${communityResponse.data.planetId}`
      )
      props.setPlanet(planetResponse.data[0])
    }
  }

  useEffect(() => {
    getPilgrimCommunityAndPlanet()
    console.log(props.nonUserPilgrim.bio)
  }, [])

  return (
    <div className="profile">
      <h1>{props.nonUserPilgrim.username}</h1>
      {props.nonUserPilgrim.communityId === null ? (
        <div></div>
      ) : (
        <h3>
          Community: {props.community.name} on {props.planet.name}
        </h3>
      )}
      <div>
        <img src={props.nonUserPilgrim.image} alt="profile-picture" />
      </div>
      {props.nonUserPilgrim.bio === null ? (
        <div></div>
      ) : (
        <div>
          <h3>Bio:</h3>
          <p>{props.nonUserPilgrim.bio}</p>
        </div>
      )}
    </div>
  )
}

export default PilgrimProfile
