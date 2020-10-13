import styles from './subscription-summary.module.css'
import { formatCurrency } from '../../../utils/numbers'
import { format } from 'date-fns'

// Components
import Select from '../inputs/select'

const DEFAULT_TRIAL_PRODUCT = process.env.DEFAULT_TRIAL_PRODUCT

const SubscriptionSummary = ({ productData, setSelectedPrice, selectedPrice, checkoutProduct = DEFAULT_TRIAL_PRODUCT }) => {
  const formattedToday = format(new Date(), 'MM/dd/yyyy')

  const annual = productData.annual.find(price => price.product === checkoutProduct)
  const monthly = productData.monthly.find(price => price.product === checkoutProduct)

  const calcSavings = () => {
    return monthly.amount * 12 - annual.amount
  }

  const getInterval = (interval) => {
    if (interval === 'year') return 'Annual'
    else return 'Monthly'
  }

  const billingOptions = [annual, monthly].map(price => ({ ...price, label: `${price.name} ${getInterval(price.interval)} Plan`, value: price.id }))

  if (!selectedPrice) {
    setSelectedPrice(billingOptions[0])
  }

  return (
    <section className={`${styles.container} card-content`}>
      <h3>Subscription Summary</h3>

      <h5>Billing</h5>
      <Select
        placeholder='Select plan...'
        options={billingOptions}
        onChange={(selected) => setSelectedPrice(selected)}
        value={selectedPrice ? { ...selectedPrice, label: `${selectedPrice.name} ${getInterval(selectedPrice.interval)} Plan`, value: selectedPrice.id } : null}
      />

      <div className={styles.due}>
        <h5>Due Now:</h5>
        {selectedPrice ?
          <div>{formatCurrency(selectedPrice.amount / 100)}</div>
          :
          <div>-</div>
        }
      </div>


      <div className={styles.savings}>
        <h5>Annual Savings</h5>
        {selectedPrice?.interval === 'year' ?
          <div>{formatCurrency(calcSavings() / 100)}</div>
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
