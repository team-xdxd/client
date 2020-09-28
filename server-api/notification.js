import axios from 'axios'

const notificationUrl = `${process.env.SERVER_BASE_URL}/notifications`

export default {
  getNotifications: () => axios.get(notificationUrl),
  patchNotification: (data) => axios.patch(notificationUrl, data),
  getSubscriptionAuthData: () => axios.get(`${notificationUrl}/subscription`)
}