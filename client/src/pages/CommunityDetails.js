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
    await axios.put(`http://localhost:3001/api/pilgrim/${pilgrim.id}`, {
      communityId: communityId
    })
    // Need to increase planet population here
  }

  const leaveCommunity = async () => {
    await axios.put(`http://localhost:3001/api/pilgrim/${pilgrim.id}`, {
      communityId: null
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
        <button>Leave Community</button>
      ) : (
        <button>Join Community</button>
      )}
    </div>
  )
}

export default CommunityDetails
