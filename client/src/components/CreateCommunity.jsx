import { useState } from 'react'
import axios from 'axios'

const CreateCommunity = (props) => {
  const [formValues, setFormValues] = useState({name: '', image: ''})

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (formValues.image === '') {
    //   setFormValues({ ...formValues, ['image']: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png' })
    // }
    await axios.post(`http://localhost:3001/api/community/${props.planetId}`, formValues).catch((err) => console.log(err))
    props.toggleCreating(false)
  } 

  return(
    <form onSubmit={handleSubmit}>
      <label>Community name:</label>
      <input onChange={handleChange} type="text" name="name" required />
      <label>Community image:</label>
      <input onChange={handleChange} type="text" name="image" required />
      <button type="submit">Create Community</button>
    </form>
  )
}

export default CreateCommunity