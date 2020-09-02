import styles from './subscription.module.css'
import { useState, useContext, useEffect } from 'react'
import { TeamContext } from '../../../../context'

// Components
import SubscriptionNameForm from './subscription-name-form'
import SubscriptionAddressForm from './subscription-address-form'
import SubscriptionForm from './subscription-form'

const Subscription = () => {

  const [companyAddress, setCompanyAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  })

  const { getTeam } = useContext(TeamContext)

  useEffect(() => {
    getTeam()
  }, [])

  return (
    <>
      <div>
        <SubscriptionNameForm />
        <SubscriptionAddressForm />
      </div>
      <div>
        <SubscriptionForm />
      </div>
    </>
  )
}

export default Subscription