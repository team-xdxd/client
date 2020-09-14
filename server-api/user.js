import axios from 'axios'
import querystring from 'querystring'

const userUrl = `${process.env.SERVER_BASE_URL}/users`

export default {
  getUserData: () => axios.get(userUrl),
  signIn: (data) => axios.post(`${userUrl}/signin`, data),
  signUp: (data, queryData = {}) => axios.post(`${userUrl}/signup?${querystring.encode(queryData)}`, data),
  requestPasswordreset: (data) => axios.post(`${userUrl}/generate-password-reset`, data),
  passwordReset: (data) => axios.post(`${userUrl}/password-reset`, data),
  getTeamMembers: () => axios.get(`${userUrl}/members`),

  uploadPhoto: (formData) => axios.post(`${userUrl}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),

  patchUser: (data) => axios.patch(`${userUrl}`, data),

  addIntegration: (data) => axios.post(`${userUrl}/integrations`, data),
  getIntegrations: () => axios.get(`${userUrl}/integrations`),
  modifyIntegration: (id, data) => axios.patch(`${userUrl}/integrations/${id}`, data)
}