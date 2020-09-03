import axios from 'axios'

const teamUrl = `${process.env.SERVER_BASE_URL}/teams`

export default {
  getTeam: () => axios.get(teamUrl),
  patchTeam: (patchData) => axios.patch(teamUrl, patchData)
}