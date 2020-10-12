import axios from 'axios'
import querystring from 'querystring'

const notificationUrl = `${process.env.SERVER_BASE_URL}/notifications`

export default {
  getNotifications: (queryParams = {}) => axios.get(`${notificationUrl}?${querystring.encode(queryParams)}`),
  patchNotification: (data) => axios.patch(notificationUrl, data),
  getSubscriptionAuthData: () => axios.get(`${notificationUrl}/subscription`)
}

// excludeCleared