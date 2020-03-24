import axios from 'axios'

const userUrl = `${process.env.SERVER_BASE_URL}/users`

export default {
  getUserData: () => axios.get(userUrl),
  signIn: (data) => axios.post(`${userUrl}/signIn`, data),
  register: (data) => axios.post(`${userUrl}/register`, data)
}