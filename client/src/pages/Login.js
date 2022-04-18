import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInPilgrim, UpdatePassword } from '../services/Auth'

const Login = ({
  setPilgrim,
  toggleAuthenticated,
  setPasswordUpdate,
  newPassword,
  confirmNewPassword
}) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInPilgrim(formValues)
    setFormValues({ username: '', password: '' })
    setPilgrim(payload)
    toggleAuthenticated(true)
    navigate('/home')
  }

  const handleUpdate = async (e) => {
    navigate('/update')
  }

  return (
    <div className="login-forms">
      <div className="input-wrapper">
        <label htmlFor="username">Username </label>
        <input
          onChange={handleChange}
          name="username"
          type="username"
          placeholder="Choose Username"
          value={formValues.username}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={formValues.password}
          required
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          disabled={!formValues.username || !formValues.password}
        >
          Login
        </button>
        <button onClick={handleUpdate}>Forgot Password</button>
      </div>
    </div>
  )
}

export default Login
