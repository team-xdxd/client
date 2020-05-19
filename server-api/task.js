import axios from 'axios'
import queryString from 'querystring'

const taskUrl = `${process.env.SERVER_BASE_URL}/tasks`

export default {
  getTaskById: (id) => axios.get(`${taskUrl}/${id}`),
  getTasks: (queryParams) => axios.get(`${taskUrl}?${queryString.stringify(queryParams)}`),
  createTask: (data) => axios.post(taskUrl, data),
  updateTask: (id, data) => axios.patch(`${taskUrl}/${id}`, data),
  deleteTask: (id) => axios.delete(`${taskUrl}/${id}`),
  addTag: (id, data) => axios.post(`${taskUrl}/${id}/tags`, data),
  removeTag: (id, tagId) => axios.delete(`${taskUrl}/${id}/tags/${tagId}`)
}