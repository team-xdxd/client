import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import styles from './signup-form.module.css'
import { UserContext } from '../../context'
import userApi from '../../server-api/user'
import cookiesUtils from '../../utils/cookies'

// Components
import AuthButton from '../common/buttons/auth-button'
import FormInput from '../common/inputs/form-input'
import Input from '../common/inputs/input'
import Select from '../common/inputs/select'

import companySizeOptions from '../../resources/data/company-sizes.json'

const SignupForm = ({ inviteCode = '' }) => {
  const { control, handleSubmit, errors, getValues } = useForm()
  const [companySize, setCompanySize] = useState(undefined)
  const [submitError, setSubmitError] = useState('')
  const { fetchUser } = useContext(UserContext)
  const onSubmit = async fieldData => {
    try {
      const createData = {
        email: fieldData.email,
        name: fieldData.name,
        company: fieldData.company,
        phone: fieldData.phone,
        password: fieldData.password,
        companySize: companySize ? companySize.value : ''
      }
      const { data } = await userApi.signUp(createData, { inviteCode })
      cookiesUtils.setUserJWT(data.token)
      fetchUser()
    } catch (err) {
      if (err.response?.data?.message) {
        setSubmitError(err.response.data.message)
      } else {
        setSubmitError('Something went wrong, please try again later')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div>
        <FormInput
          InputComponent={
            <Input
              type='text'
              placeholder='Full Name'
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
        <FormInput
          InputComponent={
            <Input
              type='text'
              placeholder='Work Email Address'
            />
          }
          name='email'
          control={control}
          rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
          message={'Invalid email address'}
          errors={errors}
        />
      </div>
      <div>
        <FormInput
          InputComponent={
            <Input
              type='text'
              placeholder='Phone Number'
            />
          }
          name='phone'
          control={control}
          rules={{ required: true, pattern: /\d/i, maxLength: 10 }}
          message={'Invalid phone number'}
          errors={errors}
        />
      </div>
      {!inviteCode &&
        <div>
          <FormInput
            InputComponent={
              <Input
                type='text'
                placeholder='Company Name'
              />
            }
            name='company'
            control={control}
            rules={{ minLength: 2, maxLength: 40, required: true }}
            message={'This field should be between 2 and 40 characters long'}
            errors={errors}
          />
        </div>
      }
      {!inviteCode &&
        <div>
          <Select
            placeholder='Company Size...'
            options={companySizeOptions}
            onChange={selected => setCompanySize(selected)}
            value={companySize}
          />
        </div>
      }
      <div>
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
      </div>
      <div>
        <FormInput
          InputComponent={
            <Input
              type='password'
              placeholder='Confirm Password'
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
          text={'Sign Up'}
        />
      </div>
    </form>
  )
}

export default SignupForm
