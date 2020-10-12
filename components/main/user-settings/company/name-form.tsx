import styles from './name-form.module.css'
import { useContext, useState, useEffect } from 'react'
import { TeamContext } from '../../../../context'
import { useForm } from 'react-hook-form'

// Components
import Button from '../../../common/buttons/button'
import FormInput from '../../../common/inputs/form-input'
import Input from '../../../common/inputs/input'

const NameForm = () => {
  const { team, patchTeam } = useContext(TeamContext)
  const { control, handleSubmit, errors } = useForm()

  const onSubmit = fieldData => {
    const { company } = fieldData
    patchTeam({ company })
  }
  <h3>Company Name</h3>
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h3>Company Name</h3>
      {team &&
        <div className={styles['form-container']}>
          <div className={'fields-first'}>
            <FormInput
              InputComponent={
                <Input
                  type='text'
                />
              }
              name='company'
              defaultValue={team.company}
              control={control}
              rules={{ minLength: 2, maxLength: 30, required: true }}
              errors={errors}
              message={'This field should be between 2 and 30 characters long'}
            />
          </div>
          <div>
            <Button
              text='Save Changes'
              type='submit'
              styleType='input-height-primary'
            />
          </div>
        </div>
      }
    </form>
  )
}

export default NameForm