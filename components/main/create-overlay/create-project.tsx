import styles from './create-project.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Components
import Button from '../../common/button'
import FormInput from '../../common/form-input'
import Input from '../../common/input'
import Select from '../../common/select'

import projectTypeOptions from '../../../parameters/project-types.json'

const CreateProject = () => {
  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')
  const [type, setType] = useState()

  const onSubmit = async projectData => {
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
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
          <FormInput
            InputComponent={
              <Input
                type='text'
                placeholder='Name Your Project'
                styleType='regular'
              />
            }
            name='name'
            control={control}
            message={'This field should be minimun 8 characters long'}
            rules={{ minLength: 2, maxLength: 20, required: true }}
            errors={errors}
          />
        </div>
        <div className={styles['button-select-wrapper']}>
          <div className={styles.type}>
            <Select
              placeholder='Select Content Type...'
              options={projectTypeOptions}
              onChange={selected => setType(selected)}
              value={type}
              styleType='regular'
            />
          </div>
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

export default CreateProject
