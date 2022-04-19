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
    <div className="register col">
      <div className="card-overlay centered">
        <h1>Register!</h1>
        <form className="forms" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            {/* <label name="username">Username: </label> */}
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="username"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            {/* <label name="username">Full Name: </label> */}
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
              value={formValues.name}
              required
            />
          </div>
          <div className="pilgrim-image">
            {/* <label for="image">Profile Picture: </label> */}
            <input
              onChange={handleChange}
              placeholder="Profile image"
              name="image"
              type="text"
              value={formValues.image}
            />
          </div>
          <div className="input-wrapper">
            {/* <label name="username">
              <span>Bio: </span>
            </label> */}
            <textarea
              onChange={handleChange}
              name="bio"
              type="text"
              placeholder="Enter a short bio here..."
              value={formValues.bio}
            />
          </div>
          <div className="input-wrapper">
            {/* <label htmlFor="email">Email: </label> */}
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            {/* <label name="password">Password: </label> */}
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            {/* <label name="confirmPassword">Confirm Password: </label> */}
            <input
              onChange={handleChange}
              placeholder="confirm password"
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
