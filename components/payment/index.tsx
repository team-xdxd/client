import { useEffect, useContext, useState } from 'react'
import styles from './index.module.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import paymentApi from '../../server-api/billing'

// Components
import SubscriptionSummary from './subscription-summary'
import CreditCardForm from '../common/payment/credit-card-form'

const stripePromise = loadStripe('pk_test_bK1C20PBomU24spmlMeg4AXp')

// TODO: Hardcoded basic plan. User should choose product at a previous stage
const productId = 'prod_Gykl2A2BewZhJW'

const Payment = () => {

  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    try {
      const { data } = await paymentApi.getPlans(productId)
      setPlans(data)
    } catch (err) {
      // TODO: Handle error
      console.log(err)
    }
  }

  const subscribe = async (paymentMethodId) => {
    try {
      const subscriptionResponse = await paymentApi.createSubscripcion({
        paymentMethodId: paymentMethodId,
        planId: selectedPlan.id
      })
      alert('Subscription successful!')
    } catch (err) {
      Promise.reject(err)
    }
  }

  return (
    <main className={`${styles.container} container-centered`}>
      <div>
        <SubscriptionSummary
          plans={plans}
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
        <Elements stripe={stripePromise}>
          <CreditCardForm
            subscribe={subscribe}
            buttonDisabled={!selectedPlan}
          />
        </Elements>
      </div>
    </main>
  )
}

export default Payment
