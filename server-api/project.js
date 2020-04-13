import axios from 'axios'

const projectUrl = `${process.env.SERVER_BASE_URL}/projects`

export default {
  getProjectById: (id) => axios.get(`${projectUrl}/${id}`),
  getProjects: () => axios.get(projectUrl),
  createProject: (data) => axios.post(projectUrl, data),
  updateProject: (id, data) => axios.patch(`${projectUrl}/${id}`, data),
  addtask: (id, data) => axios.post(`${projectUrl}/${id}/tasks`, data),
  addTag: (id, data) => axios.post(`${projectUrl}/${id}/tags`, data)
}