import styles from './subscription-summary.module.css'

// Components
import Select from '../inputs/select'

const DEFAULT_TRIAL_PRODUCT = process.env.DEFAULT_TRIAL_PRODUCT

const SubscriptionSummary = ({ productData, setSelectedPrice, selectedPrice }) => {
  const formattedToday = '2020-03-24'

  const annual = productData.annual.find(price => price.product === DEFAULT_TRIAL_PRODUCT)
  const monthly = productData.monthly.find(price => price.product === DEFAULT_TRIAL_PRODUCT)

  const calcSavings = () => {
    return monthly.amount * 12 - annual.amount
  }

  const getInterval = (interval) => {
    if(interval === 'year') return 'Annual'
    else return 'Monthly'
  }

  return (
    <section className={`${styles.container} card-content`}>
      <h3>Subscription Summary</h3>

      <h5>Billing</h5>
      <Select
        placeholder='Select plan...'
        options={[annual, monthly].map(price => ({ ...price, label: `${price.name} ${getInterval(price.interval)} Plan`, value: price.id }))}
        onChange={(selected) => setSelectedPrice(selected)}
        value={selectedPrice ? { ...selectedPrice, label: `${selectedPrice.name} ${getInterval(selectedPrice.interval)} Plan`, value: selectedPrice.id } : null}
      />

      <div className={styles.due}>
        <h5>Due Now:</h5>
        {selectedPrice ?
          <div>{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(selectedPrice.amount / 100)}</div>
          :
          <div>-</div>
        }
      </div>


      <div className={styles.savings}>
        <h5>Annual Savings</h5>
        {selectedPrice?.interval === 'year' ?
          <div>{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(calcSavings() / 100)}</div>
          :
          <div>-</div>
        }
      </div>

      <p>
        By clicking on subscribe, you agree to our subscriber terms.
        Your plan starts immediately. You will be billed on {formattedToday} and each {selectedPrice?.interval ? selectedPrice?.interval : 'month'} after.
        Sparkfive subscriptions auto-renew {selectedPrice?.interval === 'year' ? 'yearly' : 'monthly'} until you cancel.
       </p>
    </section>
  )
}

export default SubscriptionSummary
