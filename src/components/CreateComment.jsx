import { useState } from 'react'
import axios from 'axios'

const CreateComment = (props) => {
  const [formValues, setFormValues] = useState({comment: ''})

  let apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://space-pilgrims.herokuapp.com'
    : 'http://localhost:3001'

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${apiUrl}/api/comment/${props.communityId}/${props.pilgrim.id}`, formValues).catch((err) => console.log(err))
    props.toggleClickedComment(!props.clickedComment)
    setFormValues({comment: ''})
  } 


  return(
    <form className='comment-form' onSubmit={handleSubmit}>
      <textarea placeholder='Enter comment here ...' onChange={handleChange} type="text" name="comment" required value={formValues.comment} />
      <button className='post-comment-btn' type="submit">Send</button>
    </form>
  )
}

export default CreateComment