import axios from 'axios'

const roleUrl = `${process.env.SERVER_BASE_URL}/roles`

export default {
  getroles: () => axios.get(roleUrl)
}