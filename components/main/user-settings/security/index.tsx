import styles from './index.module.css'
import { UserContext } from '../../../../context'
import { useContext, useState, useEffect } from 'react'
import userApi from '../../../../server-api/user'
import toastUtils from '../../../../utils/toast'

// Components
import UserPreference from '../../../common/account/user-preference'

const Notifications = () => {

  const { user, setUser } = useContext(UserContext)

  const [enabledTwoFactor, setEnabledTwoFactor] = useState(false)

  useEffect(() => {
    if (user) {
      setUserProperties()
    }
  }, [user])

  const setUserProperties = () => {
    setEnabledTwoFactor(user.twoFactor)
  }

  const handleChange = async (updateData) => {
    try {
      const { data } = await userApi.patchUser(updateData)
      setUser(data)
    } catch (err) {
      console.log(err)
      toastUtils.error('Could not change preference, please try again later')
    }
  }

  const setTwoFactor = (value) => {
    setEnabledTwoFactor(value)
    handleChange({ twoFactor: value })
  }

  return (
    <div className={styles.container}>
      <UserPreference
        enabled={enabledTwoFactor}
        setPreference={setTwoFactor}
        title={'Two-Factor Authentication'}
        description={`Enabling this provides an extra layer of security for all users in your account. A security code will be required in addition to your password`}
      />
    </div>
  )
}

export default Notifications