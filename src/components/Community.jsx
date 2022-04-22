import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CreateCommunity from './CreateCommunity'
import Modal from './Modal'

const Community = (props) => {


  let navigate = useNavigate()   // Define useNavigate as a variable

  
  const [creating, toggleCreating] = useState(false) // Define useState that controls creating a community


  // Axios call link to control deployed site
  let apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://space-pilgrims.herokuapp.com'
    : 'http://localhost:3001'


  // Axios call to get all communities by planet Id
  const getCommunities = async () => {
    const response = await axios.get(
      `${apiUrl}/api/community/${props.planetId}`
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
      const sortedCommunity = await axios.get(`${apiUrl}/api/community/communities/${populations[i][0]}`)
      sortedCommunities.push(sortedCommunity.data)
    }
    props.setCommunities(sortedCommunities)
  }

  //useEffect to handle the getCommunities axios call with the dependency variable to watch fo when the community is being created

  useEffect(() => {
    getCommunities()
  }, [creating])

  // Function to navigate pilgrim to commmunity
  
  const goToCommunity = (communityId) => {
    if (props.pilgrim !== null) {
      navigate(`/communitypage/${communityId}`)
    } else { 
      // Error handling to ensure only logged in pilgrims can navigate to community. Modal appears with the setErrorMessage 
      props.setOpenModal(true)
      props.setErrorMessage('You are not Logged in. please return to the homepage and create an account!')
    }
  }

  // Function to handle community form if a pilgrim clicks the Create Community Button
  
  const openCommnityForm = () => {
    if (props.pilgrim !== null) {
      toggleCreating(true)
    } else {
      props.setOpenModal(true)
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
      
      {/* Toggle the CreateCommunity form if the button is selected */}

      {creating ? (<CreateCommunity setOpenModal={props.setOpenModal} toggleCreating={toggleCreating} planetId={props.planetId} pilgrim={props.pilgrim} />) :(
        <button className='community-btn' onClick={openCommnityForm}>Create Community</button>)}
    </div>
  )
}

export default Community
