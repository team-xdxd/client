import styles from './subscription.module.css'
import { useState, useContext, useEffect } from 'react'
import { TeamContext } from '../../../../context'

// Components
import SubscriptionPlan from './subscription-plan'
import SubscriptionCheckout from './subscription-checkout'

const Subscription = ({ paymentMethod, getPaymentMethod }) => {

  const { getPlan, plan } = useContext(TeamContext)
  const [onCheckout, setOnCheckout] = useState(false)

  useEffect(() => {
    getPlan()
  }, [])

  const goBack = () => {
    getPaymentMethod()
    setOnCheckout(false)
  }

  return (
    <div>
      {!onCheckout ?
        <SubscriptionPlan goCheckout={() => setOnCheckout(true)} paymentMethod={paymentMethod} />
        :
        <SubscriptionCheckout goBack={goBack} checkoutProduct={plan?.stripeProduct?.id} />
      }
    </div>
  )
}

export default Subscription