import styles from './index.module.css'
import { UserContext } from '../../../../context'
import { useContext, useState, useEffect } from 'react'
import userApi from '../../../../server-api/user'
import update from 'immutability-helper'
import toastUtils from '../../../../utils/toast'
import notificationApi from '../../../../server-api/notification'

// Components
import UserPreference from '../../../common/account/user-preference'
import NotificationList from '../../../common/notifications/notification-list'

const Notifications = () => {

  const { user, setUser } = useContext(UserContext)

  const [enabledEmailNotif, setEnabledEmailNotif] = useState(false)

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (user) {
      setUserProperties()
      getPastNotifications()
    }
  }, [user])

  const getPastNotifications = async () => {
    try {
      const { data: { notifications: dataNotifications } } = await notificationApi.getNotifications({ excludeCleared: 'false' })
      setNotifications(dataNotifications)
    } catch (err) {
      console.log(err)
    }
  }

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

  const markAsSeen = async (notification) => {
    try {
      await notificationApi.patchNotification({ notifications: [{ ...notification, status: 'seen' }] })
      const notificationIndex = notifications.findIndex(notif => notif.notifId === notification.notifId)
      setNotifications(update(notifications, {
        [notificationIndex]: {
          $merge: { status: 'seen' }
        }
      }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.preferences}>
        <UserPreference
          enabled={enabledEmailNotif}
          setPreference={setEmailNotif}
          title={'Email notifications'}
          description={`Enabling this will enable your account's email to recieve notifications whenever you are tagged in a comment`}
        />
      </div>
      <NotificationList notifications={notifications} mode={'page'} onMarkRead={markAsSeen} />
    </div>
  )
}

export default Notifications