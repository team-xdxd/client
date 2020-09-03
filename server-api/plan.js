import axios from 'axios'

const planUrl = `${process.env.SERVER_BASE_URL}/plans`

export default {
  getPlanDetail: () => axios.get(planUrl)
}