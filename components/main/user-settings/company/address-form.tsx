import styles from './address-form.module.css'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LocationContext, TeamContext } from '../../../../context'

// Components
import Button from '../../../common/buttons/button'
import FormInput from '../../../common/inputs/form-input'
import Input from '../../../common/inputs/input'
import Select from '../../../common/inputs/select'

const AddressForm = () => {
  const { control, handleSubmit, errors } = useForm()

  const { countries, states, loadStates } = useContext(LocationContext)
  const { team, patchTeam } = useContext(TeamContext)

  const [country, setCountry] = useState('')
  const [state, seState] = useState('')

  const onSubmit = fieldData => {
    const { address, city, zip } = fieldData
    const patchData = {
      address,
      city,
      state,
      country,
      zip
    }
    patchTeam(patchData)
  }

  useEffect(() => {
    if (team) {
      setCountry(team.country)
      seState(team.state)
    }
  }, [team])

  useEffect(() => {
    if (country && countries.length > 0) {
      loadStates(getSelectedItem('country', country)?.id)
    }
  }, [country, countries])

  const getSelectedItem = (type, value) => {
    const findFn = (item) => item.name === value
    switch (type) {
      case 'country':
        return countries.find(findFn)
      default:
        return states.find(findFn)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {team &&
        <>
          <h3>Company Address</h3>
          <div className={styles.container}>
            <div className='fields-first'>
              <FormInput
                labId='address'
                label='Address'
                InputComponent={
                  <Input
                    type='text'
                    id='address'
                  />
                }
                defaultValue={team.address}
                name='address'
                control={control}
                rules={{ minLength: 4, maxLength: 50 }}
                errors={errors}
                message={'This field should be between 4 and 50 characters long'}
              />
              <div className={styles['fields-pair']}>
                <div>
                  <label>Country</label>
                  <Select
                    placeholder='Select Country'
                    options={countries}
                    onChange={(selected) => setCountry(selected.name)}
                    value={getSelectedItem('country', country)}
                  />
                </div>
                <div >
                  <label>State</label>
                  <Select
                    placeholder='Select State'
                    options={states}
                    onChange={(selected) => seState(selected.name)}
                    value={getSelectedItem('state', state)}
                  />
                </div>
              </div>
              <div className={styles['fields-pair']}>
                <div className={styles.city}>
                  <FormInput
                    labId='city'
                    label='City'
                    InputComponent={
                      <Input
                        type='text'
                        id='city'
                      />
                    }
                    name='city'
                    defaultValue={team.city}
                    control={control}
                    rules={{ minLength: 2, maxLength: 30 }}
                    errors={errors}
                    message={'This field should be between 2 and 30 characters long'}
                  />
                </div>
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
                    defaultValue={team.zip}
                    control={control}
                    rules={{ minLength: 3, maxLength: 30 }}
                    errors={errors}
                    message={'This field should be between 3 and 30 characters long'}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                text='Save Changes'
                type='submit'
                styleType='input-height-primary'
              />
            </div>
          </div>
        </>
      }
    </form>
  )
}

export default AddressForm