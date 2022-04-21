import { useState, useEffect } from 'react'
import { RegisterPilgrim } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
  const [usernames, setUsernames] = useState([])
  const [emails, setEmails] = useState([])

  let apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://space-pilgrims.herokuapp.com'
      : 'http://localhost:3001'

  const getAllPilgrims = async () => {
    const response = await axios.get(`${apiUrl}/api/pilgrim`)
    let loadUsernames = []
    let loadEmails = []
    for (let i = 0; i < response.data.length; i++) {
      loadUsernames.push(response.data[i].username)
      loadEmails.push(response.data[i].email)
    }
    setUsernames(loadUsernames)
    setEmails(loadEmails)
  }

  useEffect(() => {
    getAllPilgrims()
  }, [])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (usernames.indexOf(formValues.username) !== -1) {
      return window.alert('Account with that username already exists')
    }
    if (emails.indexOf(formValues.email) !== -1) {
      return window.alert('Account with that email already exists')
    }
    if (formValues.image === '') {
      formValues.image =
        'https://www.clipartmax.com/png/middle/49-492189_thanksgiving-pilgrim-cartoon.png'
    }
    if (formValues.image.slice(0, 4) !== 'http') {
      return window.alert('Please choose a different image')
    }
    if (formValues.password !== formValues.confirmPassword) {
      return window.alert('Passwords must match')
    }
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
              className="register-bio"
              rows="10"
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
            className="glow-on-hover-register"
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
