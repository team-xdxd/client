import styles from './subscription-summary.module.css'

// Components
import Select from '../common/inputs/select'

const SubscriptionSummary = ({ plans, setSelectedPlan, selectedPlan }) => {
  const formattedToday = '2020-03-24'

  const calcSavings = () => {
    const monthlyPlan = plans.find(plan => plan.interval === 'month')
    const yearlyPlan = plans.find(plan => plan.interval === 'year')

    return monthlyPlan.amount * 12 - yearlyPlan.amount
  }

  return (
    <section className={`${styles.container} card-content`}>
      <h3>Subscription Summary</h3>

      <h5>Billing</h5>
      <Select
        placeholder='Select plan...'
        options={plans.map(plan => ({ ...plan, label: `${plan.nickname} Plan`, value: plan.id }))}
        onChange={(selected) => setSelectedPlan(selected)}
        value={selectedPlan ? { ...selectedPlan, label: `${selectedPlan.nickname} Plan`, value: selectedPlan.id } : null}
      />

      <div className={styles.due}>
        <h5>Due Now:</h5>
        {selectedPlan ?
          <div>{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(selectedPlan.amount / 100)}</div>
          :
          <div>-</div>
        }
      </div>


      <div className={styles.savings}>
        <h5>Annual Savings</h5>
        {selectedPlan?.interval === 'year' ?
          <div>{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(calcSavings() / 100)}</div>
          :
          <div>-</div>
        }
      </div>

      <p>
        By clicking on subscribe, you agree to our subscriber terms.
        Your plan starts immediately. You will be billed on {formattedToday} and each {selectedPlan?.interval ? selectedPlan?.interval : 'month'} after.
        Sparkfive subscriptions auto-renew {selectedPlan?.interval === 'year' ? 'yearly' : 'monthly'} until you cancel.
       </p>
    </section>
  )
}

export default SubscriptionSummary
