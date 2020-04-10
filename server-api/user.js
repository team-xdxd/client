import axios from 'axios'

const userUrl = `${process.env.SERVER_BASE_URL}/users`

export default {
  getUserData: () => axios.get(userUrl),
  signIn: (data) => axios.post(`${userUrl}/signin`, data),
  signUp: (data) => axios.post(`${userUrl}/signup`, data),
  requestPasswordreset: (data) => axios.post(`${userUrl}/generate-password-reset`, data),
  passwordReset: (data) => axios.post(`${userUrl}/password-reset`, data),
}