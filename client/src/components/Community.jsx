import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CreateCommunity from './CreateCommunity'

const Community = (props) => {
  let navigate = useNavigate()

  const [creating, toggleCreating] = useState(false)
  const [hover, setHover] = useState()

  const handleMouseIn = () => {
    setHover(props.getLiquidButton)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  const getCommunities = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/community/${props.planetId}`
    )
    let populations = []
    for (let i = 0; i < response.data.length; i++) {
      populations.push([response.data[i].id, response.data[i].population])
    }
    populations.sort((a, b) => {
      return a[1] - b[1]
    })
    populations.reverse()
    const sortedCommunities = []
    for (let i = 0; i < populations.length; i++) {
      const sortedCommunity = await axios.get(`http://localhost:3001/api/community/communities/${populations[i][0]}`)
      sortedCommunities.push(sortedCommunity.data)
    }
    props.setCommunities(sortedCommunities)
  }

  useEffect(() => {
    getCommunities()
  }, [creating])
  
  const goToCommunity = (communityId) => {
    if (props.pilgrim !== null) {
      navigate(`/communitypage/${communityId}`)
    } else {
      window.alert('Sign in')
    }
  }

  const openCommnityForm = () => {
    if (props.pilgrim !== null) {
      toggleCreating(true)
    } else {
      window.alert('Sign in')
    }
  }

  return (
    <div>
      <div className='carousel'>
        {props.communities.map((community) => (
          <div className='child' key={community.id} onClick={() => goToCommunity(community.id)} style={{border: `5px solid ${community.primaryColor}`}}>
            <h3>{community.name}</h3>
            <img className='communityImage' src={community.image} alt={community.image}  />
            <h4>Population: {community.population}</h4>
          </div>
        ))}
      </div>
      {creating ? (<CreateCommunity toggleCreating={toggleCreating} planetId={props.planetId} pilgrim={props.pilgrim} />) :(
        <button className='community-btn' onMouseOver={props.getLiquidButton} onClick={openCommnityForm}>Create Community</button>)}
    </div>
  )
}

export default Community
