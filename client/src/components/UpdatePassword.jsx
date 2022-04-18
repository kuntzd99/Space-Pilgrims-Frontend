import { useState } from "react"
import { PasswordUpdate } from "../services/Auth"
import { useNavigate } from "react-router-dom"


const UpdatePassword = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await PasswordUpdate({
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword,
      confirmNewPassword: formValues.confirmNewPassword
    })
    setFormValues({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    navigate('/profile')
  }

  return (
    <div className="updatepassword">
        <div className="update-password-card">
          <form className="password-update" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="oldPassword">Old Password:</label>
              <input onChange={handleChange} name='oldPassword' type='text' placeholder="Old Password" value={formValues.oldPassword} required/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="newPassword">New Password:</label>
              <input onChange={handleChange} name='newPassword' type='text' placeholder="New Password" value={formValues.newPassword} required/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmNewPassword"> Confirm New Password:</label>
              <input onChange={handleChange} name='confirmNewPassword' type='text' placeholder="Confirm New Password" value={formValues.confirmNewPassword} required/>
            </div>
            <button disabled={!formValues.oldPassword || (!formValues.newPassword && formValues.confirmNewPassword === formValues.newPassword) }>Update Password</button>
          </form>
        </div>
    </div>
  )
}



export default UpdatePassword