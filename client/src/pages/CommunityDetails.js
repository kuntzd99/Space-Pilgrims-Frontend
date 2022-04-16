import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const CommunityDetails = (props) => {
  const { communityId } = useParams()

  const getCommunity = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/community/communities/${communityId}`
    )
    props.setCommunity(response.data)
    const planetResponse = await axios.get(
      `http://localhost:3001/api/planet/${response.data.planetId}`
    )
    props.setPlanet(planetResponse.data[0])
  }

  const getPilgrims = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/pilgrim/${communityId}`
    )
    props.setPilgrims(response.data)
  }

  useEffect(() => {
    getCommunity()
    getPilgrims()
  }, [])

  const joinCommunity = async () => {
    await axios.put(`http://localhost:3001/api/pilgrim/${props.pilgrim.id}`, {
      communityId: communityId
    })
    let population = props.planet.population
    await axios.put(`http://localhost:3001/api/planet/${props.planet.id}`, {
      population: parseInt(population + 1)
    })
  }

  const leaveCommunity = async () => {
    await axios.put(`http://localhost:3001/api/pilgrim/${props.pilgrim.id}`, {
      communityId: null
    })
    let population = props.planet.population
    await axios.put(`http://localhost:3001/api/planet/${props.planet.id}`, {
      population: parseInt(population - 1)
    })
  }

  return (
    <div>
      <h1>{props.community.name}</h1>
      <img src={props.community.image} alt={props.community.name} />
      <h3>Members:</h3>
      {props.pilgrims.map((pilgrim) => (
        <div key={pilgrim.id}>
          <h3>{pilgrim.username}</h3>
        </div>
      ))}
      {props.pilgrim === null ? (
        <div>Login to join</div>
      ) : props.pilgrim.communityId === communityId ? (
        <button onClick={() => leaveCommunity()}>Leave Community</button>
      ) : (
        <button onClick={() => joinCommunity()}>Join Community</button>
      )}
    </div>
  )
}

export default CommunityDetails
