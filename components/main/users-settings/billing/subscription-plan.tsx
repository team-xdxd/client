import styles from './subscription-plan.module.css'
import { useContext, useEffect, useState } from 'react'
import { TeamContext } from '../../../../context'
import { format } from 'date-fns'

// Components
import Button from '../../../common/buttons/button'

const SubscriptionData = ({ label, value }) => (
  <div className={styles.item}>
    <div>{label}</div>
    <div>{value}</div>
  </div>
)

const SubscriptionPlan = () => {
  const { plan } = useContext(TeamContext)

  const getFrequency = () => {
    if (plan) {
      const { interval } = plan.stripePrice
      if (interval === 'month') return 'Monthly'
      else return 'Annual'
    }
  }

  const getAmount = () => {
    if (plan) {
      return Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' })
        .format((plan.stripePrice.amount / 1000))
    }
  }

  return (
    <div className={styles.container}>
      <h3>Subscription</h3>
      {plan &&
        <div className={styles['sub-container']}>
          <div className={styles['subscription-data']}>
            <div>
              <SubscriptionData
                label={'Plan Name'}
                value={plan.stripeProduct.name}
              />
            </div>
            <div>
              <SubscriptionData
                label={'Frequency'}
                value={getFrequency()}
              />
              <SubscriptionData
                label={'Amount'}
                value={getAmount()}
              />
            </div>
            <div>
              <SubscriptionData
                label={'Start Date'}
                value={format(new Date(plan.startDate), 'MM/dd/yyyy')}
              />
              <SubscriptionData
                label={'next Billing Date'}
                value={format(new Date(plan.endDate), 'MM/dd/yyyy')}
              />
            </div>
          </div>
          <div className={styles['button-actions']}>
            <Button
              text='Change Plan'
              type='button'
              styleType='primary'
            />
            <Button
              text='Cancel Plan'
              type='button'
              styleType='secondary'
            />
          </div>
        </div>
      }
    </div>
  )
}

export default SubscriptionPlan