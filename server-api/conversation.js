import axios from 'axios'
import querystring from 'querystring'

const baseUrl = `${process.env.SERVER_BASE_URL}`
const conversationsPath = 'conversations'

export default {
  getConversations: (itemType, itemId) => axios.get(`${baseUrl}/${itemType}/${itemId}/${conversationsPath}`),
  createComment: (itemType, itemId, conversationId, commentData, queryData = {}) => {
    return axios.post(`${baseUrl}/${itemType}/${itemId}/${conversationsPath}/${conversationId}/comments?${querystring.encode(queryData)}`, commentData)
  },
}