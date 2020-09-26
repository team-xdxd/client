import styles from './index.module.css'
import { UserContext } from '../../../../context'
import { useContext, useState, useEffect } from 'react'
import userApi from '../../../../server-api/user'
import toastUtils from '../../../../utils/toast'

// Components
import UserPreference from '../../../common/account/user-preference'

const Notifications = () => {

  const { user, setUser } = useContext(UserContext)

  const [enabledEmailNotif, setEnabledEmailNotif] = useState(false)

  useEffect(() => {
    if (user) {
      setUserProperties()
    }
  }, [user])

  const setUserProperties = () => {
    setEnabledEmailNotif(user.notifEmail)
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

  const setEmailNotif = (value) => {
    setEnabledEmailNotif(value)
    handleChange({ notifEmail: value })
  }

  return (
    <div className={styles.container}>
      <UserPreference
        enabled={enabledEmailNotif}
        setPreference={setEmailNotif}
        title={'Email notifications'}
        description={`Enabling this will enable your account's email to recieve notifications whenever you are tagged in a comment`}
      />
    </div>
  )
}

export default Notifications