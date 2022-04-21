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
  const [editingName, toggleEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingImage, toggleEditingImage] = useState(false)
  const [newImage, setNewImage] = useState('')
  const [creator, setCreator] = useState({})
  const [editingColors, toggleEditingColors] = useState(false)
  const [newPrimaryColor, setNewPrimaryColor] = useState('')
  const [newSecondaryColor, setNewSecondaryColor] = useState('')
  const [loaded, toggleLoaded] = useState(false)
  const [reload, toggleReload] = useState(false)

  let navigate = useNavigate()

  const getCommunity = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/community/communities/${communityId}`
    )
    props.setCommunity(response.data)
    const creatorResponse = await axios.get(
      `http://localhost:3001/api/pilgrim/pilgrims/${response.data.creatorId}`
    )
    setCreator(creatorResponse.data)
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

  const getPilgrim = async () => {
    if (props.pilgrim) {
      const response = await axios.get(
        `http://localhost:3001/api/pilgrim/pilgrims/${props.pilgrim.id}`
      )
      props.setPilgrim(response.data)
      toggleLoaded(true)
    } else {
      toggleReload(!reload)
    }
  }

  useEffect(() => {
    getCommunity()
    getPilgrims()
    getComments()
  }, [clicked, clickedComment, deleted])

  useEffect(() => {
    if (!loaded) {
      getPilgrim()
    }
  }, [reload])

  const joinCommunity = async () => {
    if (props.pilgrim.communityId === null) {
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
    } else {
      window.alert('You cannot be joined to multiple communities')
    }
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

  const handleNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleNameSubmit = async (e) => {
    e.preventDefault()
    props.setCommunity({ ...props.community, name: newName })
    await axios.put(`http://localhost:3001/api/community/${communityId}`, {
      name: newName
    })
    toggleEditingName(false)
  }

  const handleImageChange = (e) => {
    e.preventDefault()
    setNewImage(e.target.value)
  }

  const handleImageSubmit = async (e) => {
    e.preventDefault()
    if (newImage.slice(0, 4) !== 'http') {
      return window.alert('Please choose a different image')
    }
    props.setCommunity({ ...props.community, image: newImage })
    await axios.put(`http://localhost:3001/api/community/${communityId}`, {
      image: newImage
    })
    toggleEditingImage(false)
  }

  const removePilgrim = async (pilgrimId) => {
    await axios.put(`http://localhost:3001/api/pilgrim/${pilgrimId}`, {
      communityId: null
    })
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

  const handlePrimaryColorChange = (e) => {
    e.preventDefault()
    setNewPrimaryColor(e.target.value)
  }

  const handleSecondaryColorChange = (e) => {
    e.preventDefault()
    setNewSecondaryColor(e.target.value)
  }

  const handleColorsSubmit = async (e) => {
    e.preventDefault()
    props.setCommunity({
      ...props.community,
      primaryColor: newPrimaryColor,
      secondaryColor: newSecondaryColor
    })
    await axios.put(`http://localhost:3001/api/community/${communityId}`, {
      primaryColor: newPrimaryColor,
      secondaryColor: newSecondaryColor
    })
    toggleEditingColors(false)
  }

  return (
    <div
      className="community-details"
      style={{
        background: `linear-gradient(to right, ${props.community.primaryColor}, ${props.community.secondaryColor})`
      }}
    >
      <div className="first-col">
        {!props.pilgrim ? (
          <div>Loading</div>
        ) : parseInt(props.community.creatorId) ===
            parseInt(props.pilgrim.id) || props.pilgrim.admin === true ? (
          editingName ? (
            <div>
              <input type="text" onChange={handleNameChange} required />
              <div>
                <button onClick={() => toggleEditingName(false)}>Cancel</button>
                <button onClick={handleNameSubmit}>Submit</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <h1>{props.community.name}</h1>
              <button onClick={() => toggleEditingName(true)}>Edit</button>
            </div>
          )
        ) : (
          <h1>{props.community.name}</h1>
        )}
        {!props.pilgrim ? (
          <div>Loading</div>
        ) : parseInt(props.community.creatorId) ===
            parseInt(props.pilgrim.id) || props.pilgrim.admin === true ? (
          editingImage ? (
            <div>
              <input type="text" onChange={handleImageChange} required />
              <div>
                <button onClick={() => toggleEditingImage(false)}>
                  Cancel
                </button>
                <button onClick={handleImageSubmit}>Submit</button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                className="community-image"
                src={props.community.image}
                style={{ borderColor: props.community.secondaryColor }}
                alt={props.community.name}
              />
              <button
                onClick={() => toggleEditingImage(true)}
                style={{ maxWidth: '5vh' }}
              >
                Edit
              </button>
            </div>
          )
        ) : (
          <img
            className="community-image"
            src={props.community.image}
            style={{ borderColor: props.community.secondaryColor }}
            alt={props.community.name}
          />
        )}
        {props.pilgrim === null ? (
          <div>Login to join</div>
        ) : parseInt(props.pilgrim.communityId) === parseInt(communityId) ||
          props.pilgrim.admin === true ? (
          <button onClick={() => leaveCommunity()}>Leave Community</button>
        ) : (
          <button onClick={() => joinCommunity()}>Join Community</button>
        )}
        {!props.pilgrim ? (
          <div>Loading</div>
        ) : parseInt(props.pilgrim.id) === parseInt(creator.id) ? (
          <h2>Creator: {creator.username}</h2>
        ) : (
          <h2>
            Creator:{' '}
            <Link to={`/profile/${creator.id}`}>{creator.username}</Link>
          </h2>
        )}
        <h3>Members:</h3>
        {props.pilgrims.map((pilgrim) => (
          <div key={pilgrim.id}>
            {pilgrim.id === props.pilgrim.id ? (
              <h3>{pilgrim.username}</h3>
            ) : parseInt(props.community.creatorId) ===
                parseInt(props.pilgrim.id) || props.pilgrim.admin === true ? (
              <div style={{ display: 'flex' }}>
                <Link to={`/profile/${pilgrim.id}`}>
                  <h3>{pilgrim.username}</h3>
                </Link>
                <button
                  onClick={() => removePilgrim(pilgrim.id)}
                  style={{ marginLeft: '1vh' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <Link to={`/profile/${pilgrim.id}`}>
                <h3>{pilgrim.username}</h3>
              </Link>
            )}
          </div>
        ))}
        <h3 className="population">Population: {props.community.population}</h3>
        {!props.pilgrim ? (
          <div>Loading</div>
        ) : parseInt(props.community.creatorId) ===
            parseInt(props.pilgrim.id) || props.pilgrim.admin === true ? (
          editingColors ? (
            <div>
              <div>
                <input
                  type="color"
                  onChange={handlePrimaryColorChange}
                  required
                  style={{ margin: '.5vh' }}
                />
                <input
                  type="color"
                  onChange={handleSecondaryColorChange}
                  required
                  style={{ margin: '.5vh' }}
                />
              </div>
              <div>
                <button
                  onClick={() => toggleEditingColors(false)}
                  style={{ margin: '.5vh' }}
                >
                  Cancel
                </button>
                <button style={{ margin: '.5vh' }} onClick={handleColorsSubmit}>
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => toggleEditingColors(true)}>
              Edit Colors
            </button>
          )
        ) : (
          <div></div>
        )}
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
