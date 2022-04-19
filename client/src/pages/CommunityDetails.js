import { useParams, Link } from 'react-router-dom'
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
  const [userImages, setUserImages] = useState([])

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
    let loadComments = response.data
    loadComments.reverse()
    props.setComments(loadComments)
    let loadUsernames = []
    let loadImages = []
    for (let i = 0; i < response.data.length; i++) {
      let username = await axios.get(
        `http://localhost:3001/api/pilgrim/pilgrims/${response.data[i].pilgrimId}`
      )
      loadUsernames.push(username.data.username)
      loadImages.push(username.data.image)
    }
    setUserImages(loadImages)
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
      className="community-details"
      style={{
        background: `linear-gradient(to right, ${props.community.primaryColor}, ${props.community.secondaryColor})`
      }}
    >
      <div className="first-col">
        <h1>{props.community.name}</h1>
        <img
          className="community-image"
          src={props.community.image}
          style={{ borderColor: props.community.secondaryColor }}
          alt={props.community.name}
        />
        {props.pilgrim === null ? (
          <div>Login to join</div>
        ) : props.pilgrim.communityId === communityId ? (
          <button onClick={() => leaveCommunity()}>Leave Community</button>
        ) : (
          <button onClick={() => joinCommunity()}>Join Community</button>
        )}
        <h3>Members:</h3>
        {props.pilgrims.map((pilgrim) => (
          <div key={pilgrim.id}>
            {pilgrim.id === props.pilgrim.id ? (
              <h3>{pilgrim.username}</h3>
            ) : (
              <Link to={`/profile/${pilgrim.id}`}>
                <h3>{pilgrim.username}</h3>
              </Link>
            )}
          </div>
        ))}
        <h3 className="population">Population: {props.community.population}</h3>
      </div>

      {/* Second div for comments */}

      <div className="second-col comments">
        {/* Comments Input Box */}

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

        {/* Render all comments on communiuty page */}
        <div className="comments-area">
          {props.comments.map((comment, index) => (
            <div className="singleComment" key={comment.id}>
              <div className="comment-userName">{usernames[index]}</div>
              <div className="image-comment">
                <img
                  src={userImages[index]}
                  alt="user-Image"
                  className="user-image-comment"
                />
                <div className="comment-comment">{comment.comment}</div>
              </div>
              {comment.pilgrimId === props.pilgrim.id ? (
                <button
                  className="comment-button"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="comment-button"
                  onClick={() => navigate(`/profile/${comment.pilgrimId}`)}
                >
                  View Profile
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommunityDetails
