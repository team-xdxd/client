import axios from 'axios'

const billingUrl = `${process.env.SERVER_BASE_URL}/billing`

export default {
  getProductsWithPrices: () => axios.get(`${billingUrl}/products`),
  getPriceById: (priceId) => axios.get(`${billingUrl}/prices/${priceId}`),
}