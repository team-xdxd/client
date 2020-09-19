import styles from './new-password-modal.module.css'
import { useForm } from 'react-hook-form'

// Components
import BaseModal from '../../../common/modals/base'
import Button from '../../../common/buttons/button'
import FormInput from '../../../common/inputs/form-input'
import Input from '../../../common/inputs/input'

const NewPasswordModal = ({ closeModal, modalIsOpen, confirmChange }) => {

  const { control, handleSubmit, errors, getValues } = useForm()

  const onSubmit = ({ password }) => {
    confirmChange(password)
  }

  return (
    <BaseModal
      closeModal={closeModal}
      modalIsOpen={modalIsOpen}
      headText={'Enter new password'}
    >
      <div className={styles.container}>
        <p>Since you are using an external method to sign in, you will need to create a new password in order to change your email</p>
        <p>After you change your email, you will not be able to use your external sign in method</p>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${styles['password-form']}`}>
          <div className={'fields-first'}>
            <h3>New Password</h3>
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
            <h3>Confirm New Password</h3>
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
          <div className={styles['change-password-button']}>
            <Button
              text='Confirm Email change'
              type='submit'
              styleType='input-height-primary'
            />
          </div>
        </form>
      </div>
    </BaseModal>
  )
}

export default NewPasswordModal
