import styles from './subscription-name-form.module.css'
import { useForm } from 'react-hook-form'

// Components
import Button from '../../../common/buttons/button'
import FormInput from '../../../common/inputs/form-input'
import Input from '../../../common/inputs/input'
import Select from '../../../common/inputs/select'

const SubscriptionNameForm = ({
  companyName,
  setCompanyName,
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
            placeholder='Full Name'
          />
        }
        name='name'
        control={control}
        rules={{ minLength: 4, maxLength: 30, required: true }}
        errors={errors}
        message={'This field should be between 4 and 30 characters long'}
      />
    </form>
  )
}

export default SubscriptionNameForm