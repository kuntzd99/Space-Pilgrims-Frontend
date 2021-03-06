import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MessageForm from '../components/MessageForm'

const PilgrimProfile = (props) => {
  const { pilgrimId } = useParams()
  const [sendingMessage, toggleSendingMessage] = useState(false)

  let apiUrl = 'https://space-pilgrims.herokuapp.com'

  const getPilgrimCommunityAndPlanet = async () => {
    const response = await axios.get(
      `${apiUrl}/api/pilgrim/pilgrims/${pilgrimId}`
    )
    props.setNonUserPilgrim(response.data)
    if (response.data.communityId) {
      const communityResponse = await axios.get(
        `${apiUrl}/api/community/communities/${response.data.communityId}`
      )
      props.setCommunity(communityResponse.data)
      const planetResponse = await axios.get(
        `${apiUrl}/api/planet/${communityResponse.data.planetId}`
      )
      props.setPlanet(planetResponse.data[0])
    }
  }

  useEffect(() => {
    getPilgrimCommunityAndPlanet()
  }, [])

  return (
    <div className="profile">
      <h1>{props.nonUserPilgrim.username}</h1>
      {/* check for community */}
      {props.nonUserPilgrim.communityId === null ? (
        <div>No Community</div>
      ) : (
        <h3>
          Community:{' '}
          <Link to={`/communitypage/${props.community.id}`}>
            {props.community.name}
          </Link>{' '}
          on{' '}
          <Link to={`/planetpage/${props.planet.id}`}>{props.planet.name}</Link>
        </h3>
      )}
      <div>
        <img src={props.nonUserPilgrim.image} alt="profile-picture" />
      </div>
      {props.nonUserPilgrim.bio === null ? (
        <div></div>
      ) : (
        <div>
          <h3>Bio:</h3>
          <p style={{ margin: 0 }}>{props.nonUserPilgrim.bio}</p>
        </div>
      )}
      {sendingMessage ? (
        <MessageForm
          sendingMessage={sendingMessage}
          toggleSendingMessage={toggleSendingMessage}
          sentTo={props.nonUserPilgrim.id}
          sentFrom={props.pilgrim.id}
        />
      ) : (
        <button
          style={{ marginTop: '1vh' }}
          onClick={() => toggleSendingMessage(true)}
        >
          Send Message
        </button>
      )}
    </div>
  )
}

export default PilgrimProfile
