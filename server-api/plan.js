import axios from 'axios'
import querystring from 'querystring'
const planUrl = `${process.env.SERVER_BASE_URL}/plans`

export default {
  getPlanDetail: ({ withStorageUsage = '' } = {}) => axios.get(`${planUrl}?${querystring.encode({ withStorageUsage })}`),
  changePlan: ({ priceId, subProrationDate = null, paymentMethodId = '' }) => axios.put(planUrl, { priceId, subProrationDate, paymentMethodId }),
  cancelPlan: () => axios.put(`${planUrl}/cancel`, {}),
  getAvailableProducts: () => axios.get(`${planUrl}/products`),
  getInvoices: () => axios.get(`${planUrl}/invoices`),
  getUpcomingInvoice: () => axios.get(`${planUrl}/upcoming-invoice`),
  getPaymentMethod: () => axios.get(`${planUrl}/payment-method`),
  addPaymentMethod: ({ paymentMethodId }) => axios.patch(`${planUrl}/payment-method`, { paymentMethodId })
}