import { useNavigate } from "react-router-dom"
import UpdatePassword from "./UpdatePassword"

const Profile = ({pilgrim}) => {

  


  return (
    <div className="profile">
      <div className="profile card" key={pilgrim.id}>
          <h3>{pilgrim.username}</h3>
          <div>
            <img src={pilgrim.image} alt='profile-picture'/>
          </div>
          <p>{pilgrim.bio}</p>
        </div>
      <UpdatePassword />
    </div>
  )

}
export default Profile