import UpdatePassword from "./UpdatePassword"
import { useEffect, useState } from 'react'
import axios from "axios"
import Mailbox from "./Mailbox"

const Profile = (props) => {
  const [changingPassword, toggleChangingPassword] = useState(false)
  const [changingImage, toggleChangingImage] = useState(false)
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [changingBio, toggleChangingBio] = useState(false)
  const [loaded, toggleLoaded] = useState(false)
  const [reload, toggleReload] = useState(false)

  const getCommunity = async () => {
    if (props.pilgrim) {
      const pilgrimResponse = await axios.get(
        `http://localhost:3001/api/pilgrim/pilgrims/${props.pilgrim.id}`
      )
      props.setPilgrim(pilgrimResponse.data)
      if (pilgrimResponse.data.communityId) {
        const response = await axios.get(
          `http://localhost:3001/api/community/communities/${pilgrimResponse.data.communityId}`
        )
        props.setCommunity(response.data)
        const planetResponse = await axios.get(
          `http://localhost:3001/api/planet/${response.data.planetId}`
        )
        props.setPlanet(planetResponse.data[0])
        toggleLoaded(true)
      }
      toggleLoaded(true)
    } else {
      toggleReload(!reload)
    }
  }


  useEffect(() => {
    if (!loaded) {
      getCommunity()
    }
  }, [reload])

  const handleImageChange = (e) => {
    e.preventDefault()
    setImage(e.target.value)
  }

  const handleBioChange = (e) => {
    e.preventDefault()
    setBio(e.target.value)
  }

  const handleImageSubmit = async (e) => {
    e.preventDefault()
    if (image.slice(0, 4) !== 'http') {
      return window.alert('Please choose a different image')
    }
    await axios.put(`http://localhost:3001/api/pilgrim/${props.pilgrim.id}`, {image: image})
    props.setPilgrim({...props.pilgrim, image: image})
    toggleChangingImage(false)
  }

  const handleBioSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:3001/api/pilgrim/${props.pilgrim.id}`, {bio: bio})
    props.setPilgrim({...props.pilgrim, bio: bio})
    toggleChangingBio(false)
  }

  return (
    <div className="profile">
      {props.pilgrim ? (<div>
      <div className="profile card" key={props.pilgrim.id}>
          <h1>{props.pilgrim.username}</h1>
          {props.community ? (<h3>Community: {props.community.name} on {props.planet.name}</h3>) : (<div>No community</div>)}
          <div>
            {changingImage ? 
            (<div style={{marginTop: '1vh'}}>
              <label>New image: </label><input type="text" onChange={handleImageChange} />
              <div style={{marginTop: '1vh'}}>
                <button onClick={handleImageSubmit}>Set New Image</button>
                <button onClick={() => toggleChangingImage(false)}>Cancel</button>
              </div>
            </div>) 
            : 
            (<div>
              <div>
                <img src={props.pilgrim.image} alt='profile-picture'/>
              </div>
                <button onClick={() => toggleChangingImage(true)}>Change Image</button>
              </div>)}
          </div>
          {changingBio ?
          (
          <div>
            <textarea placeholder="New Bio: " onChange={handleBioChange} />
            <div>
                <button onClick={handleBioSubmit}>Set New Bio</button>
                <button onClick={() => toggleChangingBio(false)}>Cancel</button>
              </div>
          </div>)
          :
          props.pilgrim.bio ? (<div><h3>Bio:</h3><p>{props.pilgrim.bio}</p><button onClick={() => toggleChangingBio(true)}>Change Bio</button></div>) :
          (<button onClick={() => toggleChangingBio(true)}>Set Bio</button>)
          }
          <Mailbox pilgrim={props.pilgrim} messages={props.messages} setMessages={props.setMessages} />
          {changingPassword ? (<div><UpdatePassword /><button onClick={() => toggleChangingPassword(false)}>Cancel</button></div>) : (<button onClick={() => toggleChangingPassword(true)}>Change password</button>)}
        </div>
      </div>
      )
      :
      (<div>Loading</div>)}
    </div>
  )
}

export default Profile