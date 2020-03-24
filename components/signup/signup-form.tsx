import { useForm, Controller } from 'react-hook-form'
import styles from './signup-form.module.css'

// Components
import Button from '../common/button'
import FormInput from '../common/form-input'
import Input from '../common/input'
import Select from '../common/select'

const SignupForm = ({ }) => {
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = data => console.log(data)
  console.log(errors)

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
          rules={{ required: true }}
          error={errors.name}
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
          rules={{ required: true }}
          error={errors.email}
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
          rules={{ required: true }}
          error={errors.phone}
        />
      </div>
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
          rules={{ required: true }}
          error={errors.company}
        />
      </div>
      <div>
        <FormInput
          InputComponent={
            <Select
              placeholder='Company Size...'
              options={[]}
            />
          }
          name='companySize'
          control={control}
          rules={{ required: true }}
          error={errors.companySize}
        />
      </div>
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
          rules={{ required: true }}
          error={errors.password}
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
          rules={{ required: true }}
          error={errors.passwordConfirm}
        />
      </div>
      <div className={styles['button-wrapper']}>
        <Button
          type={'submit'}
          text={'Sign Up'}
        />
      </div>
    </form>
  )
}

export default SignupForm
