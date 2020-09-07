import styles from './subscription-plan.module.css'
import { useContext, useEffect, useState } from 'react'
import { TeamContext } from '../../../../context'
import { format } from 'date-fns'
import Link from 'next/link'
import planApi from '../../../../server-api/plan'

// Components
import Button from '../../../common/buttons/button'
import BaseModal from '../../../common/modals/base'

const SubscriptionData = ({ label, value }) => (
  <div className={styles.item}>
    <div>{label}</div>
    <div>{value}</div>
  </div>
)

const SubscriptionPlan = () => {
  const { plan } = useContext(TeamContext)

  const [cancelOpen, setCancelOpen] = useState(false)

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

  const cancelPlan = async () => {
    try {
      await planApi.cancelPlan()
    } catch (err) {
      console.log(err)
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
            <Link href='/main/user-settings/plans'>
              <a>
                <Button
                  text='Change Plan'
                  type='button'
                  styleType='primary'
                />
              </a>
            </Link>
            <Button
              text='Cancel Plan'
              type='button'
              styleType='secondary'
              onClick={() => setCancelOpen(true)}
            />
          </div>
        </div>
      }
      <BaseModal
        closeModal={() => setCancelOpen(false)}
        modalIsOpen={cancelOpen}
        headText={'Are you sure you want to cancel your plan?'}
        confirmAction={cancelPlan}
        confirmText={'Cancel plan'} >
      </BaseModal>
    </div>
  )
}

export default SubscriptionPlan