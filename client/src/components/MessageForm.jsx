import { useState } from 'react'
import axios from 'axios'

const MessageForm = (props) => {
  const [formValues, setFormValues] = useState({message: ''})

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/api/message/${props.sentTo}/${props.sentFrom}`, formValues).catch((err) => console.log(err))
    props.toggleSendingMessage(!props.sendingMessage)
  } 

  return(
    <form className='comment-form' onSubmit={handleSubmit}>
      <textarea placeholder='Enter message here ...' onChange={handleChange} type="text" name="message" required />
      <div>
      <button onClick={() => props.toggleSendingMessage(false)}>Cancel</button>
      <button className='post-comment-btn' type="submit">Send</button>
      </div>
    </form>
  )
}

export default MessageForm