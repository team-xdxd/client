import axios from 'axios'

const campaignUrl = `${process.env.SERVER_BASE_URL}/campaigns`

export default {
  getCampaignById: (id) => axios.get(`${campaignUrl}/${id}`),
  getCampaigns: () => axios.get(campaignUrl),
  createCampaign: (data) => axios.post(campaignUrl, data),
  updateCampaign: (id, data) => axios.patch(`${campaignUrl}/${id}`, data)
}