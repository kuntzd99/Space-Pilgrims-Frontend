import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CreateComment from '../components/CreateComment'
import { useNavigate } from 'react-router-dom'

const CommunityDetails = (props) => {
  const { communityId } = useParams()
  const [clicked, toggleClicked] = useState(false)
  const [clickedComment, toggleClickedComment] = useState(false)
  const [usernames, setUsernames] = useState([])
  const [deleted, toggleDeleted] = useState(false)

  let navigate = useNavigate()

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

  const getComments = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/comment/${communityId}`
    )
    props.setComments(response.data)
    const loadUsernames = []
    for (let i = 0; i < response.data.length; i++) {
      let username = await axios.get(
        `http://localhost:3001/api/pilgrim/pilgrims/${response.data[i].pilgrimId}`
      )
      loadUsernames.push(username.data.username)
    }
    setUsernames(loadUsernames)
  }

  useEffect(() => {
    getCommunity()
    getPilgrims()
    getComments()
  }, [clicked, clickedComment, deleted])

  const joinCommunity = async () => {
    await axios.put(`http://localhost:3001/api/pilgrim/${props.pilgrim.id}`, {
      communityId: communityId
    })
    props.setPilgrim({ ...props.pilgrim, communityId: communityId })
    let population = props.planet.population
    await axios.put(`http://localhost:3001/api/planet/${props.planet.id}`, {
      population: parseInt(population + 1)
    })
    props.setPlanet({ ...props.planet, population: parseInt(population + 1) })
    let communityPopulation = props.community.population
    await axios.put(`http://localhost:3001/api/community/${communityId}`, {
      population: parseInt(communityPopulation + 1)
    })
    props.setCommunity({
      ...props.community,
      population: parseInt(communityPopulation + 1)
    })
    toggleClicked(!clicked)
  }

  const leaveCommunity = async () => {
    await axios.put(`http://localhost:3001/api/pilgrim/${props.pilgrim.id}`, {
      communityId: null
    })
    props.setPilgrim({ ...props.pilgrim, communityId: null })
    let population = props.planet.population
    await axios.put(`http://localhost:3001/api/planet/${props.planet.id}`, {
      population: parseInt(population - 1)
    })
    props.setPlanet({ ...props.planet, population: parseInt(population - 1) })
    let communityPopulation = props.community.population
    await axios.put(`http://localhost:3001/api/community/${communityId}`, {
      population: parseInt(communityPopulation - 1)
    })
    props.setCommunity({
      ...props.community,
      population: parseInt(communityPopulation - 1)
    })
    toggleClicked(!clicked)
  }

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:3001/api/comment/${id}`)
    toggleDeleted(!deleted)
  }

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${props.community.primaryColor}, ${props.community.secondaryColor})`
      }}
    >
      <h1>{props.community.name}</h1>
      <img
        src={props.community.image}
        style={{ borderColor: props.community.secondaryColor }}
        alt={props.community.name}
      />
      <h3>Population: {props.community.population}</h3>
      <h3>Members:</h3>
      {props.pilgrims.map((pilgrim) => (
        <div key={pilgrim.id}>
          {pilgrim.id === props.pilgrim.id ? (
            <h3>{pilgrim.username}</h3>
          ) : (
            <div>
              <h3>{pilgrim.username}</h3>
              <button onClick={() => navigate(`/profile/${pilgrim.id}`)}>
                View Profile
              </button>
            </div>
          )}
        </div>
      ))}
      {props.pilgrim === null ? (
        <div>Login to join</div>
      ) : props.pilgrim.communityId === communityId ? (
        <button onClick={() => leaveCommunity()}>Leave Community</button>
      ) : (
        <button onClick={() => joinCommunity()}>Join Community</button>
      )}
      {props.comments.map((comment, index) => (
        <div key={comment.id}>
          {usernames[index]}: {comment.comment}
          {comment.pilgrimId === props.pilgrim.id ? (
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          ) : (
            <button onClick={() => navigate(`/profile/${comment.pilgrimId}`)}>
              View Profile
            </button>
          )}
        </div>
      ))}
      {props.pilgrim === null ? (
        <div>Login to comment</div>
      ) : (
        <CreateComment
          clickedComment={clickedComment}
          toggleClickedComment={toggleClickedComment}
          communityId={communityId}
          pilgrim={props.pilgrim}
        />
      )}
    </div>
  )
}

export default CommunityDetails
