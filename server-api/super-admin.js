import axios from 'axios'
import querystring from 'querystring'
const superAdminUrl = `${process.env.SERVER_BASE_URL}/super-admin`

export default {
  getUsers: (queryParams = {}) => axios.get(`${superAdminUrl}/users?${querystring.encode(queryParams)}`),
  getUserJWT: (userId) => axios.get(`${superAdminUrl}/users/${userId}/token`)
}
