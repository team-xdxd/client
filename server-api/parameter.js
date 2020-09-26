import axios from 'axios'
import querystring from 'querystring'

const parameterUrl = `${process.env.SERVER_BASE_URL}/parameters`

export default {
  getCountries: () => axios.get(`${parameterUrl}/countries`),
  getStates: ({ countryId }) => axios.get(`${parameterUrl}/states?${querystring.encode({ countryId })}`),
  getCities: ({ stateId }) => axios.get(`${parameterUrl}/cities?${querystring.encode({ stateId })}`),
  getAvailableIntegrations: () => axios.get(`${parameterUrl}/integrations`),
}