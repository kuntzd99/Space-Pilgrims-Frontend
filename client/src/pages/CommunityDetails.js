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
    </div>
  )
}

export default CommunityDetails
