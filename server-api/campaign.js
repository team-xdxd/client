import axios from 'axios'
import queryString from 'querystring'

const campaignUrl = `${process.env.SERVER_BASE_URL}/campaigns`

export default {
  getCampaignById: (id) => axios.get(`${campaignUrl}/${id}`),
  getCampaigns: (queryParams) => axios.get(`${campaignUrl}?${queryString.stringify(queryParams)}`),
  createCampaign: (data) => axios.post(campaignUrl, data),
  updateCampaign: (id, data) => axios.patch(`${campaignUrl}/${id}`, data),
  deleteCampaign: (id) => axios.delete(`${campaignUrl}/${id}`),
  addProject: (id, data) => axios.post(`${campaignUrl}/${id}/projects`, data),
  addTag: (id, data) => axios.post(`${campaignUrl}/${id}/tags`, data),
  removeTag: (id, tagId) => axios.delete(`${campaignUrl}/${id}/tags/${tagId}`),

  addCollaborators: (id, data) => axios.post(`${campaignUrl}/${id}/collaborators`, data),
  removeCollaborators: (id, data) => axios.delete(`${campaignUrl}/${id}/collaborators`, { data })
}