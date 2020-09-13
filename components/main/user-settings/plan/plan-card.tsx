import styles from './plan-card.module.css'
import featuresConstants from './constants'
import { formatCurrency } from '../../../../utils/numbers'

// Components
import Button from '../../../common/buttons/button'

const PlanCard = ({
  type,
  id,
  product,
  currency,
  amount,
  interval,
  name,
  metadata,
  onChange = (priceId) => { },
  buttonDisabled,
  buttonText,
  paymentMethodExists = false
}) => {

  let monthValue = amount / 100
  if (interval === 'year') {
    monthValue = amount / 100 / 12
  }

  const ChangeButton = () =>
    <Button
      text={buttonText}
      type='button'
      disabled={buttonDisabled}
      onClick={onChange}
      styleType='primary'
    />

  return (
    <div className={styles.container}>
      <h3>{name.toUpperCase()}</h3>
      <p className={styles.description}>{featuresConstants[`${metadata.benefits_id}_SUMMARY`]}</p>
      <div className={styles.pricing}>
        {type === 'enterprise' ?
          <div className={styles.contact}>Contact Us</div>
          :
          <>
            <div className={styles.monthly}>
              <div>{formatCurrency(monthValue)}</div>
              <div>month</div>
            </div>
            {interval === 'year' &&
              <div className={styles.anual}>{`billed ${formatCurrency(amount / 100)} anually`}</div>
            }
          </>
        }
      </div>
      <div className={styles['key-header']}>Key Features:</div>
      <ul className={styles.features}>
        {featuresConstants[`${metadata.benefits_id}_FEATURES`].map((feature) => (
          <li key={feature}>
            <div>✔</div>
            <div>{feature}</div>
          </li>
        ))}
      </ul>
      {(paymentMethodExists || type === 'enterprise') ?
        <>
          {type === 'enterprise' ?
            <a href="mailto:sales@sparkfive.com">
              <ChangeButton />
            </a>
            :
            <ChangeButton />
          }
        </>
        :
        <div className={styles['please-add']}>Please add a Payment method</div>
      }
    </div>
  )
}

export default PlanCard