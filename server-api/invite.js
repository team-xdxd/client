import axios from 'axios'

const inviteUrl = `${process.env.SERVER_BASE_URL}/invites`

export default {
  getInvites: () => axios.get(inviteUrl),
  sendInvite: ({ email, roleId }) => axios.post(inviteUrl, { email, roleId }),
  patchInvite: (id, updatedata) => axios.patch(`${inviteUrl}/${id}`, updatedata),
  deleteInvite: (id) => axios.delete(`${inviteUrl}/${id}`),
}