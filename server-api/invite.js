import axios from 'axios'

const inviteUrl = `${process.env.SERVER_BASE_URL}/invites`

export default {
  getInvites: () => axios.get(inviteUrl),
  sendInvite: ({ email, roleId }) => axios.post(inviteUrl, { email, roleId })
}