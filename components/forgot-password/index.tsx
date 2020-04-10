import { useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import userApi from '../../server-api/user'

// Container
import AuthContainer from '../common/auth-container'
import AuthButton from '../common/auth-button'
import FormInput from '../common/form-input'
import Input from '../common/input'

const ForgotPassword = () => {
  const { control, handleSubmit, errors } = useForm()
  const [instructionsSent, setInstructionsSent] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const onSubmit = async forgotData => {
    try {
      setInstructionsSent(true)
      userApi.requestPasswordreset({ email: forgotData.email })
    } catch (err) {
      // TODO: Show error message
      setSubmitError('An error occured, please try again later')
    }
  }

  return (
    <main className={`${styles.container} container-centered`}>
      {!instructionsSent ?
        <AuthContainer
          title='Forgot Your Password?'
          subtitle='We are here to help!'
        >
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <FormInput
                InputComponent={
                  <Input
                    type='text'
                    placeholder='Email Address'
                  />
                }
                name='email'
                control={control}
                rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
                message={'Invalid email address'}
                errors={errors}
              />
            </div>
            {submitError &&
              <p className='submit-error'>{submitError}</p>
            }
            <div className={styles['button-wrapper']}>
              <AuthButton
                type={'submit'}
                text={'Send Password Reset Email'}
              />
            </div>
          </form>
        </AuthContainer>
        :
        <AuthContainer
          title='Instructions were Sent!'
        >
          <p className={styles.instructions}>
            If it's not in your inbox in a few minutes, double check your spam folder or <span onClick={() => setInstructionsSent(false)}>try sending again.</span>
          </p>
        </AuthContainer>
      }
      <p className='nav-text'>Back to <Link href='/login'><span>Log In</span></Link></p>
    </main>
  )
}

export default ForgotPassword
