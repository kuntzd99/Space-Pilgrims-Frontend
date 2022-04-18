import { useState } from 'react'
import { RegisterPilgrim } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    name: '',
    image: '',
    bio: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterPilgrim({
      username: formValues.username,
      name: formValues.name,
      image: formValues.image,
      bio: formValues.bio,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      username: '',
      name: '',
      image: '',
      bio: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }

  return (
    <div className="col">
      <div className="card-overlay centered">
        <form className="forms" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label name="username">Username:</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="CoolPigrim08"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <label name="username">Full Name:</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={formValues.name}
              required
            />
          </div>
          <div className="pilgrim-image">
            <label for="image">Choose Your Profile Picture:</label>
            <input
              onChange={handleChange}
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              value={formValues.image}
            />
          </div>
          <div className="input-wrapper">
            <label name="username">Bio:</label>
            <textarea
              onChange={handleChange}
              name="bio"
              type="text"
              placeholder="Enter a short bio here..."
              value={formValues.bio}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="pilgrim@pilgrim.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label name="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label name="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            className="registerbtn"
            disabled={
              !formValues.username ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
