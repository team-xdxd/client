import { useState, useContext } from 'react'
import styles from './login-form.module.css'
import { UserContext, LoadingContext } from '../../context'
import Link from 'next/link'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import userApi from '../../server-api/user'
import cookiesUtils from '../../utils/cookies'

// Components
import AuthButton from '../common/buttons/auth-button'
import FormInput from '../common/inputs/form-input'
import Input from '../common/inputs/input'

const Form = () => {
  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')
  const { afterAuth } = useContext(UserContext)
  const { setIsLoading } = useContext(LoadingContext)
  const onSubmit = async loginData => {
    try {
      setIsLoading(true)
      const signInData = {
        email: loginData.email,
        password: loginData.password
      }
      const { data } = await userApi.signIn(signInData)
      await afterAuth(data)
    } catch (err) {
      // TODO: Show error message
      if (err.response?.data?.message) {
        setSubmitError(err.response.data.message)
      } else {
        setSubmitError('Something went wrong, please try again later')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
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
      <FormInput
        InputComponent={
          <Input
            type='password'
            placeholder='Password'
          />
        }
        name='password'
        control={control}
        message={'This field should be minimun 8 characters long'}
        rules={{ minLength: 8, maxLength: 80, required: true }}
        errors={errors}
      />
      <div className={styles.forgot}>
        <Link href='/forgot-password'><span>Forgot Your password?</span></Link>
      </div>
      {submitError &&
        <p className='submit-error'>{submitError}</p>
      }
      <div className={styles['button-wrapper']}>
        <AuthButton
          type={'submit'}
          text={'Log In'}
        />
      </div>
    </form>
  )
}

export default Form
