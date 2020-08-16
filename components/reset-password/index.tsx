import { useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import userApi from '../../server-api/user'
import urlUtils from '../../utils/url'

// Container
import AuthContainer from '../common/containers/auth-container'
import AuthButton from '../common/buttons/auth-button'
import FormInput from '../common/inputs/form-input'
import Input from '../common/inputs/input'

const ForgotPassword = () => {
  const { control, handleSubmit, errors, getValues } = useForm()
  const [passwordReset, setPasswordReset] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const onSubmit = async resetData => {
    try {
      const { resetToken } = urlUtils.getQueryParameters()
      if (resetToken) {
        await userApi.passwordReset({
          resetToken,
          password: resetData.password
        })
        setPasswordReset(true)
      } else {
        setSubmitError('Invalid password reset link')
      }

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
      {!passwordReset ?
        <AuthContainer
          title='Password Reset'
          subtitle='Enter your new password'
        >
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <FormInput
                InputComponent={
                  <Input
                    type='password'
                    placeholder='New Password'
                  />
                }
                name='password'
                control={control}
                message={'This field should be minimun 8 characters long'}
                rules={{ minLength: 8, maxLength: 80, required: true }}
                errors={errors}
              />
            </div>
            <div>
              <FormInput
                InputComponent={
                  <Input
                    type='password'
                    placeholder='Confirm New Password'
                  />
                }
                name='passwordConfirm'
                control={control}
                rules={{ validate: value => value === getValues().password }}
                message={'Passwords must match'}
                errors={errors}
              />
            </div>
            {submitError &&
              <p className='submit-error'>{submitError}</p>
            }
            <div className={styles['button-wrapper']}>
              <AuthButton
                type={'submit'}
                text={'Reset PAssword'}
              />
            </div>
          </form>
        </AuthContainer>
        :
        <AuthContainer
          title='Password Reset'
        >
          <p className='nav-text'>
            Password reset was successful! <Link href='/login'><span>Back to Log In.</span></Link>
          </p>
        </AuthContainer>
      }
    </main>
  )
}

export default ForgotPassword
