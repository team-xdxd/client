import styles from './basic.module.css'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import userApi from '../../../../server-api/user'
import { UserContext } from '../../../../context'
import toastUtils from '../../../../utils/toast'
import { capitalCase } from 'change-case'

// Components
import NewPasswordModal from './new-password-modal'
import Button from '../../../common/buttons/button'
import FormInput from '../../../common/inputs/form-input'
import Input from '../../../common/inputs/input'

const Basic = ({ name, email, provider }) => {

  const { setUser } = useContext(UserContext)

  const { control: controlName, handleSubmit: handleName, errors: errorsName } = useForm()
  const { control: controlEmail, handleSubmit: handleEmail, errors: errorsEmail } = useForm()
  const { control: controlPassword, handleSubmit: handlePassword, errors: errorsPassword,
    getValues, reset } = useForm()

  const [newEmail, setNewEmail] = useState('')

  const onNameSubmit = ({ name }) => {
    saveChanges({ name }, 'regular')
  }

  const onEmailSubmit = ({ email }) => {
    if (!provider) {
      saveChanges({ email }, 'email')
    } else {
      setNewEmail(email)
    }
  }

  const onPasswordSubmit = ({ currentPassword, newPassword }) => {
    saveChanges({ currentPassword, newPassword }, 'password')
  }

  const saveEmailWithPassword = async (password) => {
    saveChanges({ email: newEmail, password }, 'email')
    setNewEmail('')
  }

  const saveChanges = async (updateData, type) => {
    try {
      let updatedUser
      if (type === 'email') {
        const { data } = await userApi.patchUserEmail(updateData)
        updatedUser = data
      } else if (type === 'password') {
        const { data } = await userApi.patchUserPassword(updateData)
        updatedUser = data
        reset()
      } else {
        const { data } = await userApi.patchUser(updateData)
        updatedUser = data
      }
      setUser(updatedUser)
      toastUtils.success('Profile saved successfully')
    } catch (err) {
      console.log(err)
      if (err.response?.data?.message) {
        toastUtils.error(`Could not save profile. ${err.response.data.message}`)
      } else {
        toastUtils.error('An unexpected error occured, please try again later')
      }
    }
  }

  return (
    <div className={styles.container}>
      <h3>Full Name</h3>
      <form onSubmit={handleName(onNameSubmit)} className={styles.form}>
        <div className={'fields-first'}>
          <FormInput
            InputComponent={
              <Input
                type='text'
              />
            }
            defaultValue={name}
            name='name'
            control={controlName}
            rules={{ minLength: 2, maxLength: 50, required: true }}
            errors={errorsName}
            message={'This field should be between 4 and 50 characters long'}
          />
        </div>
        <div>
          <Button
            text='Save Changes'
            type='submit'
            styleType='input-height-primary'
          />
        </div>
      </form>

      <h3>Email Address</h3>
      <form onSubmit={handleEmail(onEmailSubmit)} className={styles.form}>
        <div className={'fields-first'}>
          <FormInput
            InputComponent={
              <Input
                type='email'
              />
            }
            defaultValue={email}
            name='email'
            control={controlEmail}
            rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
            message={'Invalid email address'}
            errors={errorsEmail}
          />
        </div>
        <div>
          <Button
            text='Save Changes'
            type='submit'
            styleType='input-height-primary'
          />
        </div>
      </form>

      {!provider &&
        <form onSubmit={handlePassword(onPasswordSubmit)} className={`${styles.form} ${styles['password-form']}`}>
          <div className={'fields-first'}>
            <h3>Current Password</h3>
            <FormInput
              InputComponent={
                <Input
                  type='password'
                />
              }
              name='currentPassword'
              control={controlPassword}
              rules={{ minLength: 8, maxLength: 80, required: true }}
              errors={errorsPassword}
              message={'This field should be minimun 8 characters long'}
            />
            <h3>New Password</h3>
            <FormInput
              InputComponent={
                <Input
                  type='password'
                />
              }
              name='newPassword'
              control={controlPassword}
              rules={{
                minLength: 8, maxLength: 80, required: true,
                validate: value => value !== getValues().password
              }}
              errors={errorsPassword}
              message={'This field should be minimun 8 characters long and must be different from your current password'}
            />
          </div>
          <div className={styles['change-password-button']}>
            <Button
              text='Change Password'
              type='submit'
              styleType='input-height-primary'
            />
          </div>
        </form>
      }
      {provider &&
        <p>{`Using ${capitalCase(provider)} as the sign in provider`}</p>
      }
      {provider &&
        <NewPasswordModal
          closeModal={() => setNewEmail('')}
          modalIsOpen={newEmail}
          confirmChange={saveEmailWithPassword}
        />
      }
    </div >
  )
}

export default Basic