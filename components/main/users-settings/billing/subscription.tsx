import styles from './subscription.module.css'
import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react'
import cookiesUtils from '../../utils/cookies'

// Components
import SubscriptionNameForm from './subscription-name-form'
import SubscriptionAddressForm from './subscription-address-form'
import SubscriptionForm from './subscription-form'

const Subscription = () => {
  const { control, handleSubmit, errors, getValues } = useForm()

  const [companyName, setCompanyName] = useState('')

  const [companyAddress, setCompanyAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  })

  return (
    <>
      <div>
        <SubscriptionNameForm
          companyName={companyName}
          setCompanyName={setCompanyName}
        />
        <SubscriptionAddressForm
          companyAddress={companyAddress}
          setCompanyAddress={setCompanyAddress}
        />
      </div>
      <div>
        <SubscriptionForm />
      </div>
    </>
  )
}

export default Subscription