import styles from './create-campaign.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import campaignApi from '../../../server-api/campaign'

// Components
import Button from '../../common/buttons/button'
import FormInput from '../../common/inputs/form-input'
import Input from '../../common/inputs/input'

const CreateCampaign = () => {
  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')

  const onSubmit = async campaignData => {
    try {
      const { data } = await campaignApi.createCampaign(campaignData)
      Router.replace(`/main/campaigns/${data.id}`)
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
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
          <FormInput
            InputComponent={
              <Input
                type='text'
                placeholder='Name your Campaign'
                styleType='regular'
              />
            }
            name='name'
            control={control}
            message={'This field should be between 1 and 30 characters long'}
            rules={{ minLength: 1, maxLength: 30, required: true }}
            errors={errors}
          />
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            type={'submit'}
            text={'Next'}
            styleType='primary'
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign
