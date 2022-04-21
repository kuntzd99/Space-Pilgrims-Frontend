const CreatePilgrim = () => {

  const [formValues, setFormValues] = useState({name: '', image: '', bio: ''})

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <label>Full Name</label>
      <input onChange={handleChange} type="text" name="name" value={formValues.name} required />
      <label>Upload Image:</label>
      <input onChange={handleChange} type="file" className="pilgrimImage" name="image" required />
      <label>Add Bio</label>
      <textarea onChange={handleChange} type="text" name="bio" required />
    </div>
  )
}

export default CreatePilgrim