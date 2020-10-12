import axios from 'axios'
import querystring from 'querystring'

const authUrl = `${process.env.SERVER_BASE_URL}/auth`

export default {
  getUrl: (provider) => axios.get(`${authUrl}/${provider}/url`),
  signIn: (provider, accessCode, queryData = {}) => axios.post(`${authUrl}/${provider}/signin?${querystring.encode(queryData)}`, { accessCode }),
}