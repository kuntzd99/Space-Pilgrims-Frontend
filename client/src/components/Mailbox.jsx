import axios from 'axios'
import { useEffect, useState } from 'react'

const Mailbox = (props) => {
  const [senders, setSenders] = useState([])

  const getMessagesAndSenders = async () => {
    const response = await axios.get(`http://localhost:3001/api/message/${props.pilgrim.id}`)
    props.setMessages(response.data)
    let senderPilgrims = []
    for (let i = 0; i < response.data.length; i++) {
      const pilgrimResponse = await axios.get(`http://localhost:3001/api/pilgrim/pilgrims/${response.data[i].sentFrom}`)
      senderPilgrims.push(pilgrimResponse.data)
    }
    props.setSenders(senderPilgrims)
    setSenders(senderPilgrims)
  }

  return(
    <div>
      {props.senders.length === 0 ? (<button onClick={() => getMessagesAndSenders()}>Get messages</button>): (
        <div>
          {props.messages.map((message, index) => (
            <div key={message.id}>
              {senders[senders.length - 1 - index].username}: {message.message}
            </div>
            ))}
        </div>)}
    </div>
  )

}

export default Mailbox