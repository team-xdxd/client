import styles from './create-task.module.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import taskApi from '../../../server-api/task'
import toastUtils from '../../../utils/toast'

// Components
import Button from '../../common/buttons/button'
import FormInput from '../../common/inputs/form-input'
import Input from '../../common/inputs/input'

const CreateTask = () => {

  const { control, handleSubmit, errors } = useForm()
  const [submitError, setSubmitError] = useState('')

  const [taskNames, setTaskNames] = useState([])

  useEffect(() => {
    getTaskNames()
  }, [])

  const onSubmit = async taskData => {
    if (taskNames.includes(taskData.name)) {
      return toastUtils.error('A task with that name already exists')
    }
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

  const getTaskNames = async () => {
    try {
      const { data } = await taskApi.getTasks()
      setTaskNames(data.map(task => task.name))
    } catch (err) {
      // TODO: Error handling
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
              message={'This field should be between 1 and 30 characters long'}
              rules={{ minLength: 1, maxLength: 30, required: true }}
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
