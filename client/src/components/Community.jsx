import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CreateCommunity from './CreateCommunity'

const Community = (props) => {
  let navigate = useNavigate()

  const [creating, toggleCreating] = useState(false)

  const getCommunities = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/community/${props.planetId}`
    )
    props.setCommunities(response.data)
  }

  useEffect(() => {
    getCommunities()
  }, [creating])

  return (
    <div>
      <div>
        {props.communities.map((community) => (
          <div key={community.id} onClick={() => navigate(`/communitypage/${community.id}`)}>
            <h3>{community.name}</h3>
            <img className='communityImage' src={community.image} alt={community.image} style={{borderColor: community.primaryColor}} />
            <h4>Population: {community.population}</h4>
          </div>
        ))}
      </div>
      {creating ? (<CreateCommunity toggleCreating={toggleCreating} planetId={props.planetId} />) :(
      <button onClick={() => toggleCreating(true)}>Create Community</button>)}
    </div>
  )
}

export default Community
