import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

const Mailbox = (props) => {
  const [senders, setSenders] = useState([])

  let apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://space-pilgrims.herokuapp.com'
    : 'http://localhost:3001'

  const getMessagesAndSenders = async () => {
    const response = await axios.get(`${apiUrl}/api/message/${props.pilgrim.id}`)
    props.setMessages(response.data)
    let senderPilgrims = []
    for (let i = 0; i < response.data.length; i++) {
      const pilgrimResponse = await axios.get(`${apiUrl}/api/pilgrim/pilgrims/${response.data[i].sentFrom}`)
      senderPilgrims.push(pilgrimResponse.data)
    }
    senderPilgrims = senderPilgrims.reverse()
    if (senderPilgrims.length === 0) {
      props.setOpenModal(true)
      window.alert('No messages')
    }
    setSenders(senderPilgrims)
  }

  const deleteMessage = async (messageId) => {
    await axios.delete(`${apiUrl}/api/message/${messageId}`)
    getMessagesAndSenders()
  }

  return(
    <div className='mailbox'>
      {senders.length === 0 ? (<button onClick={() => getMessagesAndSenders()}>Get messages</button>): (
        <div>
          {props.messages.map((message, index) => (
            <div key={message.id}>
              <Link to={`/profile/${senders[senders.length - 1 - index].id}`}>
                {senders[senders.length - 1 - index].username}
              </Link>: {message.message}
              <button style={{marginLeft: '1vh'}} onClick={() => deleteMessage(message.id)}>Delete</button>
            </div>
            ))}
        </div>)}
    </div>
  )

}

export default Mailbox