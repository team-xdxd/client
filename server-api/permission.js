import axios from 'axios'

const permissionUrl = `${process.env.SERVER_BASE_URL}/permissions`

export default {
  getPermissions: () => axios.get(permissionUrl)
}