import axios from 'axios'

export default {
  setAuthToken: (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  removeAuthToken: () => {
    delete axios.defaults.headers.common['Authorization']
  }
}
