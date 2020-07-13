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
  importAssets: (provider, assetData) => axios.post(`${assetUrl}/import/${provider}`, assetData),
  updateMultiple: (updateData) => axios.patch(`${assetUrl}`, updateData),
  updateAsset: (id, updateData) => axios.patch(`${assetUrl}/${id}`, updateData),
  deleteAsset: id => axios.delete(`${assetUrl}/${id}`),
}