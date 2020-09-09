import styles from './subscription.module.css'
import { useState, useContext, useEffect } from 'react'
import { TeamContext } from '../../../../context'

// Components
import SubscriptionNameForm from './subscription-name-form'
import SubscriptionAddressForm from './subscription-address-form'

const Subscription = () => {

  const { getTeam } = useContext(TeamContext)

  useEffect(() => {
    getTeam()
  }, [])

  return (
    <div>
      <SubscriptionNameForm />
      <SubscriptionAddressForm />
    </div>
  )
}

export default Subscription