import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

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
  }, [])

  return (
    <div className="profile">
      {/* {props.nonUserPilgrim.username ? (
        <h3>{props.nonUserPilgrim.username}</h3>
      ) : (
        <div></div>
      )} */}
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
      {/* <h3>Bio:</h3>
      <p>{props.nonUserPilgrim.bio}</p> */}
    </div>
  )
}

export default PilgrimProfile
