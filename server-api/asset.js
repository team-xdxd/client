import axios from 'axios'
import querystring from 'querystring'

const assetUrl = `${process.env.SERVER_BASE_URL}/assets`

export default {
  uploadAssets: (formData, queryData = {}) => axios.post(`${assetUrl}/upload?${querystring.encode(queryData)}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getAssets: (queryData = {}) => axios.get(`${assetUrl}?${querystring.encode(queryData)}`),
  getRealUrl: (assetId) => axios.get(`${assetUrl}/${assetId}/real-url`),
  importAssets: (provider, assetData, queryData) => axios.post(`${assetUrl}/import/${provider}?${querystring.encode(queryData)}`, assetData),
  updateMultiple: (updateData) => axios.patch(`${assetUrl}`, updateData),
  getSharedAssets: (shareJWT) => axios.get(`${assetUrl}/share?shareJWT=${shareJWT}`),
  generateAndSendShareUrl: (data) => axios.post(`${assetUrl}/share`, data),
  getById: id => axios.get(`${assetUrl}/${id}`),
  updateAsset: (id, { updateData, associations = {} }) => axios.patch(`${assetUrl}/${id}`, { updateData, associations }),
  deleteAsset: id => axios.delete(`${assetUrl}/${id}`),
  addTag: (id, data) => axios.post(`${assetUrl}/${id}/tags`, data),
  removeTag: (id, tagId) => axios.delete(`${assetUrl}/${id}/tags/${tagId}`)
}