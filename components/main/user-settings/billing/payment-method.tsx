import styles from './payment-method.module.css'

import planApi from '../../../../server-api/plan'
import { useState } from 'react'

// Components
import BaseModal from '../../../common/modals/base'
import Button from '../../../common/buttons/button'
import CreditCardForm from '../../../common/payment/credit-card-form'

const PaymentMethod = ({paymentMethod, setPaymentMethod}) => {
  const [modalActive, setModalActive] = useState(false)

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
        <div className={`${styles['card-info']}`}>
          {paymentMethod ?
            <div className={'fields-first'}>
              <div>{paymentMethod.name}</div>
              <div>{`Card: ${paymentMethod.brand} ending in ${paymentMethod.last4}`}</div>
              <div>{`Exp. ${paymentMethod.expMonth}/${paymentMethod.expYear} `}</div>
            </div>
            :
            <div className={'fields-first'}>
              No card configured
            </div>
          }
          <div>
            <Button
              text='Update Card'
              type='button'
              onClick={() => setModalActive(true)}
              styleType='input-height-primary' />
          </div>
        </div>
      </div>
      <BaseModal
        closeModal={() => setModalActive(false)}
        noHeightMax={true}
        additionalClasses={['visible-block']}
        modalIsOpen={modalActive}>
        <CreditCardForm
          onConfirm={updatePaymentMethod}
          buttonText={'Update Card'}
          buttonDisabled={false}
          noBottomMargin={true}
        />
      </BaseModal>
    </>
  )
}

export default PaymentMethod