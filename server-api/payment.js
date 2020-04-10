import axios from 'axios'

const paymentUrl = `${process.env.SERVER_BASE_URL}/payments`

export default {
  getPlans: (product) => axios.get(`${paymentUrl}/plans?product=${product}`),
  createSubscripcion: (data) => axios.post(`${paymentUrl}/subscription`, data),
}