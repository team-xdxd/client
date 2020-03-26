import styles from './credit-card-form.module.css'

import { useState } from 'react'

import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'

import states from '../../resources/data/states.json'

// Components
import Button from '../common/button'
import FormInput from '../common/form-input'
import Input from '../common/input'
import Select from '../common/select'

const elemOptions = {
  style: {
    base: {
      color: '#08135e',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      backgroundColor: '#f6efe4',
      lineHeight: '2'
    }
  }
}

const stateOptions = states.map(state => ({ label: state.label, value: state.value }))

const CreditCardForm = ({ subscribe }) => {
  const { control, handleSubmit, errors } = useForm()
  const [state, setState] = useState({ label: '', value: '' })
  const stripe = useStripe()
  const elements = useElements()



  const onSubmit = async data => {
    try {
      const cardNumberElement = elements.getElement(CardNumberElement)

      const method = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          address: {
            city: data.city,
            state: state.label,
            postal_code: data.zip,
            line1: data.address
          },
          name: data.name
        }
      })
      subscribe(method.paymentMethod.id)

    } catch (err) {
      // TODO: Handle error
      console.log(err)
    }
  }

  return (
    <section className={`${styles.container} card-content`}>
      <h3>Credit Card Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <FormInput
            labId='name-form'
            label='Name on Card'
            InputComponent={
              <Input
                type='text'
                id='name-form'
              />
            }
            name='name'
            control={control}
            rules={{ required: true }}
            error={errors.name}
          />
        </div>

        <div>
          <label>Credit Card Number</label>
          <div className={styles['stripe-elem-wrapper']}>
            <CardNumberElement
              options={elemOptions}
            />
          </div>
        </div>

        <div className={styles['expiry-cvc']}>
          <div className={styles['stripe-elem-expiry']}>
            <label>Expiration Date</label>
            <div className={styles['stripe-elem-wrapper']}>
              <CardExpiryElement
                options={elemOptions} />
            </div>
          </div>

          <div className={styles['stripe-elem-security']}>
            <label>Security Code</label>
            <div className={styles['stripe-elem-wrapper']}>
              <CardCvcElement
                options={elemOptions} />
            </div>
          </div>

        </div>
        <div>
          <FormInput
            labId='address-form'
            label='Address'
            InputComponent={
              <Input
                type='text'
                id='address-form'
              />
            }
            name='address'
            control={control}
            rules={{ required: true }}
            error={errors.name}
          />
        </div>
        <div className={styles['city-state']}>
          <div className={styles.city}>
            <FormInput
              labId='city-form'
              label='City'
              InputComponent={
                <Input
                  type='text'
                  id='city-form'
                />
              }
              name='city'
              control={control}
              rules={{ required: true }}
              error={errors.name}
            />
          </div>
          <div >
            <label>State</label>
            <Select
              placeholder='Select State'
              options={stateOptions}
              onChange={(selected) => setState(selected)}
              value={state}
            />
          </div>
        </div>
        <div className={styles.zip}>
          <FormInput
            labId='zip-form'
            label='Zip Code'
            InputComponent={
              <Input
                type='text'
                id='zip-form'
              />
            }
            name='zip'
            control={control}
            rules={{ required: true }}
            error={errors.name}
          />
        </div>
        <div className={styles.subscribe}>
          <Button
            text='Subscribe'
            type='submit'
          />
        </div>
      </form>
    </section>
  )
}

export default CreditCardForm
