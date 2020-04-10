import axios from 'axios'

const authUrl = `${process.env.SERVER_BASE_URL}/auth`

export default {
  getUrl: (provider) => axios.get(`${authUrl}/${provider}/url`),
  signIn: (provider, accessCode) => axios.post(`${authUrl}/${provider}/signin`, { accessCode }),
}