import styles from './credit-card-form.module.css'

import { useState } from 'react'

import {
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

const CreditCardForm = ({ subscribe, buttonDisabled }) => {
  const { control, handleSubmit, errors } = useForm()
  const [state, setState] = useState({ label: '', value: '' })
  const [submitError, setSubmitError] = useState('')
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
      if (method.error) {
        setSubmitError(`We could not process your payment: ${method.error.message}`)
      }
      else {
        console.log(method.paymentMethod)
        subscribe(method.paymentMethod.id)
      }

    } catch (err) {
      // TODO: Handle error
      console.log(err)
      setSubmitError('We could not process your payment, please choose a different payment method')
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
            rules={{ minLength: 4, maxLength: 30, required: true }}
            errors={errors}
            message={'This field should be between 4 and 30 characters long'}
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
            rules={{ minLength: 4, maxLength: 120, required: true }}
            errors={errors}
            message={'This field should be between 4 and 120 characters long'}
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
              rules={{ minLength: 2, maxLength: 25, required: true }}
              errors={errors}
              message={'This field should be between 2 and 25 characters long'}
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
            rules={{}}
            errors={errors}
          />
        </div>
        {submitError &&
          <p className='submit-error'>{submitError}</p>
        }
        <div className={styles.subscribe}>
          <Button
            text='Subscribe'
            type='submit'
            disabled={buttonDisabled}
          />
        </div>
      </form>
    </section>
  )
}

export default CreditCardForm
