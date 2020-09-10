import axios from 'axios'
const planUrl = `${process.env.SERVER_BASE_URL}/plans`

export default {
  getPlanDetail: () => axios.get(planUrl),
  changePlan: ({ priceId, subProrationDate = null, paymentMethodId = '' }) => axios.put(planUrl, { priceId, subProrationDate, paymentMethodId }),
  cancelPlan: () => axios.put(`${planUrl}/cancel`, {}),
  getAvailableProducts: () => axios.get(`${planUrl}/products`),
  getInvoices: () => axios.get(`${planUrl}/invoices`),
  getUpcomingInvoice: () => axios.get(`${planUrl}/upcoming-invoice`),
  getPaymentMethod: () => axios.get(`${planUrl}/payment-method`),
  addPaymentMethod: ({ paymentMethodId }) => axios.patch(`${planUrl}/payment-method`, { paymentMethodId })
}