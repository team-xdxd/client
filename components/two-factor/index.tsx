import { useState, useContext } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import userApi from '../../server-api/user'
import { UserContext } from '../../context'

// Container
import AuthContainer from '../common/containers/auth-container'
import AuthButton from '../common/buttons/auth-button'
import FormInput from '../common/inputs/form-input'
import Input from '../common/inputs/input'

const TwoFactor = () => {
  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')

  const { afterAuth } = useContext(UserContext)

  const onSubmit = async ({ code }) => {
    try {
      const { data } = await userApi.validateTwoFactor({ twoFactorCode: code })
      afterAuth(data)
    } catch (err) {
      // TODO: Show error message
      if (err.response?.status === 401) {
        setSubmitError(err.response.data.message)
      } else {
        setSubmitError('An error occured, please try again later')
      }
    }
  }

  return (
    <main className={`${styles.container} container-centered`}>
      <AuthContainer
        title='Verification Code'
        subtitle='Enter your verification code'
      >
        <p>Please enter the 6-digit verification code we sent to your email. This code expires in 5 minutes.</p>
        <p className='nav-text'>If you didn't get a code, please try to <Link href='/login'><span>Log In</span></Link> again.</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <FormInput
              InputComponent={
                <Input
                  type='number'
                  placeholder='Confirmation Code'
                />
              }
              name='code'
              control={control}
              message={'The code must consist of 6 digits'}
              rules={{ minLength: 6, maxLength: 6, required: true }}
              errors={errors}
            />
          </div>
          {submitError &&
            <p className='submit-error'>{submitError}</p>
          }
          <div className={styles['button-wrapper']}>
            <AuthButton
              type={'submit'}
              text={'Confirm'}
            />
          </div>
        </form>
      </AuthContainer>
    </main>
  )
}

export default TwoFactor
