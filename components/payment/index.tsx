import styles from './index.module.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
// Components
import SubscriptionSummary from './subscription-summary'
import CreditCardForm from './credit-card-form'

const stripePromise = loadStripe('pk_test_bK1C20PBomU24spmlMeg4AXp')

const Payment = () => (
  <main className={styles.container}>
    <div>
      <SubscriptionSummary />
      <Elements stripe={stripePromise}>
        <CreditCardForm />
      </Elements>
    </div>
  </main>
)

export default Payment
