import axios from 'axios'

const taskUrl = `${process.env.SERVER_BASE_URL}/tasks`

export default {
  getTaskById: (id) => axios.get(`${taskUrl}/${id}`),
  getTasks: () => axios.get(taskUrl),
  createTask: (data) => axios.post(taskUrl, data),
  updateTask: (id, data) => axios.patch(`${taskUrl}/${id}`, data),
  deleteTask: (id) => axios.delete(`${taskUrl}/${id}`),
  addTag: (id, data) => axios.post(`${taskUrl}/${id}/tags`, data),
  removeTag: (id, tagId) => axios.delete(`${taskUrl}/${id}/tags/${tagId}`)
}