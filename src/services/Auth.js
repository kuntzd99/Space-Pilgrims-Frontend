import Client from './api'

export const SignInPilgrim = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterPilgrim = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const PasswordUpdate = async ({
  pilgrimId,
  oldPassword,
  newPassword,
  confirmNewPassword
}) => {
  try {
    const res = await Client.put(`auth/update/${pilgrimId}`, {
      oldPassword,
      newPassword,
      confirmNewPassword
    })
    console.log(res, 'UPDATE PASSWORD AXIOS')
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
