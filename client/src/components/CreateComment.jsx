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
    setFormValues({comment: ''})
  } 


  return(
    <form className='comment-form' onSubmit={handleSubmit}>
      <input placeholder='Enter comment here ...' onChange={handleChange} type="text" name="comment" required value={formValues.comment} />
      <button className='post-comment-btn' type="submit">Send</button>
    </form>
  )
}

export default CreateComment