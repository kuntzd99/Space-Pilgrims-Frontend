import { useNavigate } from "react-router-dom"
import UpdatePassword from "./UpdatePassword"
import { useEffect } from 'react'
import axios from "axios"


const Profile = (props) => {
  const getCommunity = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/community/communities/${props.pilgrimcommunityId}`
    )
    props.setCommunity(response.data)
    const planetResponse = await axios.get(
      `http://localhost:3001/api/planet/${response.data.planetId}`
    )
    props.setPlanet(planetResponse.data[0])
  }

  useEffect(() => {
    getCommunity()
  }, [])

  return (
    <div className="profile">
      <div className="profile card" key={props.pilgrim.id}>
          <h3>{props.pilgrim.username}</h3>
          {}
          <div>
            <img src={props.pilgrim.image} alt='profile-picture'/>
          </div>
          <p>{props.pilgrim.bio}</p>
        </div>
      <UpdatePassword />
    </div>
  )

}
export default Profile