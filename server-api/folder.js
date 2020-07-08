import axios from 'axios'
import queryString from 'querystring'

const folderUrl = `${process.env.SERVER_BASE_URL}/folders`

export default {
  getFolderById: (id) => axios.get(`${folderUrl}/${id}`),
  getFolders: (queryParams) => axios.get(`${folderUrl}?${queryString.stringify(queryParams)}`),
  createFolder: (data) => axios.post(folderUrl, data),
  updateFolder: (id, data) => axios.patch(`${folderUrl}/${id}`, data),
  deleteFolder: (id) => axios.delete(`${folderUrl}/${id}`),
}