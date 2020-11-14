import axios from "axios";
import queryString from "querystring";

const projectUrl = `${process.env.SERVER_BASE_URL}/projects`;

export default {
  getProjectById: (id) => axios.get(`${projectUrl}/${id}`),
  getProjects: (queryParams) =>
    axios.get(`${projectUrl}?${queryString.stringify(queryParams)}`),
  createProject: (data) => axios.post(projectUrl, data),
  updateProject: (id, data) => axios.patch(`${projectUrl}/${id}`, data),
  deleteProject: (id) => axios.delete(`${projectUrl}/${id}`),
  addtask: (id, { taskData, assignedUser }) =>
    axios.post(`${projectUrl}/${id}/tasks`, { taskData, assignedUser }),
  removeTask: (id, taskId) =>
    axios.delete(`${projectUrl}/${id}/task/${taskId}`),
  addTag: (id, data) => axios.post(`${projectUrl}/${id}/tags`, data),
  removeTag: (id, tagId) => axios.delete(`${projectUrl}/${id}/tags/${tagId}`),
  associateAssets: (id, { assetIds }, queryParams = {}) =>
    axios.patch(
      `${projectUrl}/${id}/assets?${queryString.stringify(queryParams)}`,
      { assetIds }
    ),

  addCollaborators: (id, data) =>
    axios.post(`${projectUrl}/${id}/collaborators`, data),
  removeCollaborators: (id, data) =>
    axios.delete(`${projectUrl}/${id}/collaborators`, { data }),

  // endpoint for duplicate
  createDuplicatedProject: (data) =>
    axios.post(`${projectUrl}/duplicate`, data),
};
