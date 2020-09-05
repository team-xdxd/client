import styles from './plan-card.module.css'
import featuresConstants from './constants'

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
  buttonText
}) => {

  let monthValue = amount / 100
  if (interval === 'year') {
    monthValue = amount / 100 / 12
  }

  return (
    <div>
      <h3>{name}</h3>
      <p>{featuresConstants[`${metadata.benefits_id}_SUMMARY`]}</p>
      {type === 'enterprise' ?
        <div>Contact Us</div>
        :
        <div>
          <div>{monthValue}</div>
          <div>month</div>
          {interval === 'year' &&
            <div>{`billed ${amount / 100} anually`}</div>
          }
        </div>
      }
      <div>Key Features</div>
      <ul>
        {featuresConstants[`${metadata.benefits_id}_FEATURES`].map((feature) => (
          <li key={feature}>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        text={buttonText}
        type='button'
        disabled={buttonDisabled}
        onClick={onChange}
        styleType='primary'
      />
    </div>
  )
}

export default PlanCard