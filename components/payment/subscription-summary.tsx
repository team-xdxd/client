import styles from './subscription-summary.module.css'

// Components
import Select from '../common/select'

const SubscriptionSummary = () => {
  const formattedToday = '2020-03-24'
  return (
    <section className={`${styles.container} card-content`}>
      <h3>Subscription Summary</h3>

      <h5>Billing</h5>
      <Select
        placeholder='Select plan...'
        options={[]}
      />

      <div>
        <h5>Due Now:</h5>
        <div>Formatted Plan price</div>
      </div>

      <div>
        <h5>Annual Savings</h5>
        <div>Savings per year</div>
      </div>

      <p>
        By clicking on subscribe, you agree to our subscriber terms.
        Your plan starts immediately. You will be billed on {formattedToday} and each {'year'} after.
        Sparkfive subscriptions auto-renew {'yearly'} until you cancel.
       </p>
    </section>
  )
}

export default SubscriptionSummary
