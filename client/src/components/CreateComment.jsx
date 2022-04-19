import { useState } from 'react'
import axios from 'axios'

const CreateComment = (props) => {
  const [formValues, setFormValues] = useState({comment: ''})

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/api/comment/${props.communityId}/${props.pilgrim.id}`, formValues).catch((err) => console.log(err))
    props.toggleClickedComment(!props.clickedComment)
  } 

  return(
    <form onSubmit={handleSubmit}>
      <label>Comment:</label>
      <textarea onChange={handleChange} type="text" name="comment" required />
      <button className='post-comment-btn' type="submit">Post Comment</button>
    </form>
  )
}

export default CreateComment