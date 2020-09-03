import styles from './subscription.module.css'
import { useState, useContext, useEffect } from 'react'
import { TeamContext } from '../../../../context'

// Components
import SubscriptionNameForm from './subscription-name-form'
import SubscriptionAddressForm from './subscription-address-form'
import SubscriptionPlan from './subscription-plan'

const Subscription = () => {

  const { getTeam, getPlan } = useContext(TeamContext)

  useEffect(() => {
    getTeam()
    getPlan()
  }, [])

  return (
    <>
      <div>
        <SubscriptionNameForm />
        <SubscriptionAddressForm />
      </div>
      <div>
        <SubscriptionPlan />
      </div>
    </>
  )
}

export default Subscription