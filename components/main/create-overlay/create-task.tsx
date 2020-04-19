import styles from './create-task.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import taskApi from '../../../server-api/task'

// Components
import Button from '../../common/button'
import FormInput from '../../common/form-input'
import Input from '../../common/input'

const CreateTask = () => {

  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')
  const [type, setType] = useState()

  const onSubmit = async taskData => {
    try {
      const { data } = await taskApi.createTask(taskData)
      Router.replace(`/main/tasks/${data.id}`)
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
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['button-select-wrapper']}>
          <div className={styles['input-wrapper']}>
            <FormInput
              InputComponent={
                <Input
                  type='text'
                  placeholder='Name Your Task'
                  styleType='regular'
                />
              }
              name='name'
              control={control}
              message={'This field should be minimun 2 characters long'}
              rules={{ minLength: 2, maxLength: 20, required: true }}
              errors={errors}
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

export default CreateTask
