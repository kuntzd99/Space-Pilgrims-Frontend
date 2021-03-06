import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Mailbox = (props) => {
  const [senders, setSenders] = useState([])

  let apiUrl = 'https://space-pilgrims.herokuapp.com'

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
      props.setHeader('Gee! You really need to make some friends!')
      props.setErrorMessage('You have no messages')
    }
    setSenders(senderPilgrims)
  }

  const deleteMessage = async (messageId) => {
    await axios.delete(`${apiUrl}/api/message/${messageId}`)
    getMessagesAndSenders()
  }

  return(
    <div className='mailbox'>
      {/* uses button instead of use effect because that's what worked */}
      {senders.length === 0 ? (<button onClick={() => getMessagesAndSenders()}>Get messages</button>): (
        <div className='mailbox-msg'>
          {props.messages.map((message, index) => (
            <div className='msg-display' key={message.id}>
              <div className='msg-comment'><Link to={`/profile/${senders[senders.length - 1 - index].id}`}>
                {senders[senders.length - 1 - index].username}:
              </Link></div>{message.message}
              <button 
              style={{width: '7vw', margin: '1vh 0 1vh 0', height: '3vh'}} 
              onClick={() => deleteMessage(message.id)} className='msg-display-btn'>Delete</button>
              <div>
              </div>
            </div>
            ))}
        </div>)}
    </div>
  )

}

export default Mailbox