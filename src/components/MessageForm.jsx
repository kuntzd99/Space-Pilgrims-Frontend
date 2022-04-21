import { useState } from 'react'
import axios from 'axios'

const MessageForm = (props) => {
  const [formValues, setFormValues] = useState({message: ''})

  let apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://space-pilgrims.herokuapp.com/'
    : 'http://localhost:3001/'

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${apiUrl}/api/message/${props.sentTo}/${props.sentFrom}`, formValues).catch((err) => console.log(err))
    props.toggleSendingMessage(!props.sendingMessage)
  } 

  return(
    <form style={{margin: 0}} className='comment-form' onSubmit={handleSubmit}>
      <textarea placeholder='Enter message here ...' onChange={handleChange} type="text" name="message" required />
      <div>
      <button style={{marginRight: '1vh'}} onClick={() => props.toggleSendingMessage(false)}>Cancel</button>
      <button className='post-comment-btn' type="submit">Send</button>
      </div>
    </form>
  )
}

export default MessageForm