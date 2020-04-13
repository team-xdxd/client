import axios from 'axios'

const tagUrl = `${process.env.SERVER_BASE_URL}/tags`

export default {
  getTags: () => axios.get(tagUrl)
}