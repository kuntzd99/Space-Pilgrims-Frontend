import { useState } from 'react'
import axios from 'axios'

const CreateCommunity = (props) => {
  const [formValues, setFormValues] = useState({name: '', image: '', primaryColor: '', secondaryColor: ''})

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.image.length === 0) {
      setFormValues({ ...formValues, image: 'https://banner.holidaypng.com/20191015/ugw/thanksgiving-cartoon-pumpkin-for-thanksgiving-5da595af2a2601.98162897.png'
    })
    }
    if (formValues.image.slice(0, 4) === 'http') {
      await axios.post(`http://localhost:3001/api/community/${props.planetId}`, {...formValues, population: 0, creatorId: props.pilgrim.id}).catch((err) => console.log(err))
      props.toggleCreating(false)
    } else {
      window.alert('Choose a different image')
    }
  } 

  return(
    <form className='community-form' onSubmit={handleSubmit}>
      {/* <label>Community name:</label> */}
      <input onChange={handleChange} type="text" name="name" required placeholder=' Community Name' className='community-form-input com-input'/>
      {/* <label>Community image:</label> */}
      <input onChange={handleChange} type="text" name="image" placeholder='  Community Image' className='community-form-input com-input'/>
      <label>Primary color</label>
      <input onChange={handleChange} type="color" name="primaryColor" required className='community-form-input'/>
      <label>Secondary color</label>
      <input onChange={handleChange} type="color" name="secondaryColor" required className='community-form-input'/>
      <div>
        <button style={{marginRight: '1vh'}} onClick={() => props.toggleCreating(false)}>Cancel</button>
        <button className='btn-liquid' type="submit">Create Community</button>
      </div>
    </form>
  )
}

export default CreateCommunity