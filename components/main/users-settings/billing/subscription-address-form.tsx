import styles from './subscription-address-form.module.css'
import { useForm } from 'react-hook-form'

import states from '../../../../resources/data/states.json'

// Components
import Button from '../../../common/buttons/button'
import FormInput from '../../../common/inputs/form-input'
import Input from '../../../common/inputs/input'
import Select from '../../../common/inputs/select'

const SubscriptionAddressForm = ({
  companyAddress: {
    address,
    city,
    state,
    country,
    zip
  },
  setCompanyAddress,
  onSave
}) => {
  const { control, handleSubmit, errors, getValues } = useForm()

  const onSubmit = async fieldData => {
    try {
    } catch (err) {
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormInput
        InputComponent={
          <Input
            type='text'
            placeholder='Address'
          />
        }
        name='address'
        control={control}
        rules={{ minLength: 4, maxLength: 30, required: true }}
        errors={errors}
        message={'This field should be between 4 and 30 characters long'}
      />
      <div className={styles['city-state']}>
        <div className={styles.city}>
          <FormInput
            labId='city-form'
            label='City'
            InputComponent={
              <Input
                type='text'
                id='city-form'
              />
            }
            name='city'
            control={control}
            rules={{ minLength: 2, maxLength: 25, required: true }}
            errors={errors}
            message={'This field should be between 2 and 25 characters long'}
          />
        </div>
        <div >
          <label>State</label>
          <Select
            placeholder='Select State'
            options={stateOptions}
            onChange={(selected) => setState({ ...companyAddress, state: selected.value })}
            value={state}
          />
        </div>
      </div>
      <div>
        <div className={styles['city-state']}>
          <div className={styles.zip}>
            <FormInput
              labId='zip-form'
              label='Zip Code'
              InputComponent={
                <Input
                  type='text'
                  id='zip-form'
                />
              }
              name='zip'
              control={control}
              rules={{}}
              errors={errors}
            />
          </div>
          <div >
            <label>Country</label>
            <Select
              placeholder='Select Country'
              options={stateOptions}
              onChange={(selected) => setState({ ...companyAddress, state: selected.value })}
              value={state}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default SubscriptionAddressForm