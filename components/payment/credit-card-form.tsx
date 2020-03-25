import styles from './credit-card-form.module.css'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'

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

const CreditCardForm = () => {
  const { control, handleSubmit, errors } = useForm()
  const stripe = useStripe()
  const elements = useElements()



  const onSubmit = async data => {
    try {
      const cardNumberElement = elements.getElement(CardNumberElement)
      const cardExpiryElement = elements.getElement(CardExpiryElement)
      const cardCvcElement = elements.getElement(CardCvcElement)

      console.log(cardNumberElement)
      console.log(cardExpiryElement)
      console.log(cardCvcElement)

    } catch (err) {
      console.log(err)
    }

    // TODO: Redirect to next step
  }

  return (
    <section className={`${styles.container} card-content`}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <FormInput
            InputComponent={
              <Input
                type='text'
                placeholder='Name on card'
              />
            }
            name='name'
            control={control}
            rules={{ required: true }}
            error={errors.name}
          />
        </div>
        <div className={styles['stripe-elem-wrapper']}>
          <CardNumberElement
            options={elemOptions}
          />
        </div>
        <div className={styles['expiry-cvc']}>
          <div className={`${styles['stripe-elem-wrapper']} ${styles['stripe-elem-expiry']}`}>
            <CardExpiryElement
              options={elemOptions} />
          </div>
          <div className={styles['stripe-elem-wrapper']}>
            <CardCvcElement
              options={elemOptions} />
          </div>
        </div>
        <div>
          <FormInput
            InputComponent={
              <Input
                type='text'
                placeholder='Address'
              />
            }
            name='name'
            control={control}
            rules={{ required: true }}
            error={errors.name}
          />
        </div>
        <div className={styles['city-state']}>
          <div className={styles.state}>
            <Select
              placeholder='State'
              options={[]}
            />
          </div>
          <div >
            <Select
              placeholder='City'
              options={[]}
            />
          </div>
        </div>
        <div>
          <FormInput
            InputComponent={
              <Input
                type='text'
                placeholder='Zip code'
              />
            }
            name='name'
            control={control}
            rules={{ required: true }}
            error={errors.name}
          />
        </div>
        <Button
          text='Subscribe'
          type='submit'
        />
      </form>
    </section>
  )
}

export default CreditCardForm
