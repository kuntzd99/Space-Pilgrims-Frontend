import Axios from 'axios'

let apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://space-pilgrims.herokuapp.com/api'
    : 'http://localhost:3001/api'

const Client = Axios.create({ baseURL: apiUrl })

// Intercepts every request axios makes
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
