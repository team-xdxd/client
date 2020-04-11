import styles from './create-campaign.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Components
import Button from '../../common/button'
import FormInput from '../../common/form-input'
import Input from '../../common/input'

const CreateCampaign = () => {
  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')

  const onSubmit = async campaignData => {
    try {

    } catch (err) {
      // TODO: Show error message
      if (err.response?.data?.message) {
        setSubmitError(err.response.data.message)
      } else {
        setSubmitError('Something went wrong, please try again later')
      }
    }
  }

  return (
    <div className={`${styles.container}`}>
      <h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <div>
            <FormInput
              InputComponent={
                <Input
                  type='text'
                  placeholder='Name'
                />
              }
              name='name'
              control={control}
              message={'This field should be minimun 8 characters long'}
              rules={{ minLength: 2, maxLength: 20, required: true }}
              errors={errors}
            />
          </div>
          <div className={styles['button-wrapper']}>
            <Button
              type={'submit'}
              text={'Next'}
            />
          </div>
        </form>
      </h2>

    </div>
  )
}

export default CreateCampaign
