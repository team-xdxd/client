import styles from './payment-method.module.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import planApi from '../../../../server-api/plan'
import { useState, useEffect } from 'react'

// Components
import BaseModal from '../../../common/modals/base'
import Button from '../../../common/buttons/button'
import CreditCardForm from '../../../common/payment/credit-card-form'

// TODO: config ndoe types to kill this error
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState(undefined)
  const [modalActive, setModalActive] = useState(false)
  useEffect(() => {
    getPaymentMethod()
  }, [])

  const getPaymentMethod = async () => {
    try {
      const { data } = await planApi.getPaymentMethod()
      console.log(data)
      setPaymentMethod(data)
    } catch (err) {
      console.log(err)
    }
  }

  const updatePaymentMethod = async (paymentMethodId) => {
    try {
      const { data } = await planApi.addPaymentMethod({ paymentMethodId })
      setPaymentMethod(data)
    } catch (err) {
      console.log(err)
    } finally {
      setModalActive(false)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h3>Active Card</h3>
        <div className={styles['card-info']}>
          {paymentMethod ?
            <div>
              <div>{paymentMethod.name}</div>
              <div>{`Card: ${paymentMethod.brand} ending in ${paymentMethod.last4}`}</div>
              <div>{`Exp. ${paymentMethod.expMonth}/${paymentMethod.expYear} `}</div>
            </div>
            :
            <div>
              No card configured
            </div>
          }
          <div>
            <Button
              text='Update Card'
              type='button'
              onClick={() => setModalActive(true)}
              styleType='primary' />
          </div>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <BaseModal
          closeModal={() => setModalActive(false)}
          modalIsOpen={modalActive}>
          <CreditCardForm
            onConfirm={updatePaymentMethod}
            buttonText={'Update Card'}
            buttonDisabled={false}
          />
        </BaseModal>
      </Elements>
    </>
  )
}

export default PaymentMethod