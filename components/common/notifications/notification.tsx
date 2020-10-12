import { useState, useEffect } from 'react'
import { Navigation } from '../../../assets'
import styles from './notification.module.css'
import update from 'immutability-helper'
import notificationApi from '../../../server-api/notification'

import appSyncSubscription from '../../../aws-appsync-subscription'

// Components
import NotificationList from './notification-list'
import IconClickable from '../buttons/icon-clickable'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'

const Notification = () => {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    initiateSubscription()
    getPastNotifications()
  }, [])

  const initiateSubscription = async () => {
    try {
      // Get auth subscription headers from server
      const { data: { initheaders, subHeaders, subData } } = await notificationApi.getSubscriptionAuthData()
      appSyncSubscription.initConnection({
        uri: process.env.APPSYNC_GRAPHQL_REALTIMEURL,
        queryParams: {
          // All header values need to be string, otherwise the connection attmept gets a 400 err
          header: btoa(JSON.stringify({ ...initheaders, 'Content-Length': initheaders['Content-Length'].toString() })),
          payload: btoa(JSON.stringify({}))
        },
        subHeaders,
        subData
      }, 0, () => initListening({ subHeaders, subData }))
    } catch (err) {
      console.log(err)
    }
  }

  const initListening = ({ subHeaders, subData }) => {

    const sendData = (data) => {
      if (!socket) return
      socket.send(JSON.stringify(data))
    }
    const socket = appSyncSubscription.getSocket()

    sendData({
      type: 'connection_init'
    })

    const messageHandler = ({ data: jsonData }) => {
      const { type, payload } = JSON.parse(jsonData)
      if (type === 'connection_ack') {
        sendData({
          id: "1",
          payload: {
            data: JSON.stringify(subData),
            extensions: {
              authorization: subHeaders
            }
          },
          type: 'start'
        })
      } else if (type === 'data') {
        const { data: { onCreateNotificationSF } } = payload
        getPastNotifications()
      }
    }

    socket.onmessage = messageHandler
  }

  const getPastNotifications = async () => {
    try {
      const { data: { notifications: dataNotifications } } = await notificationApi.getNotifications()
      setNotifications(dataNotifications)
    } catch (err) {
      console.log(err)
    }
  }

  const onClear = async (notification) => {
    try {
      await notificationApi.patchNotification({ notifications: [{ ...notification, status: 'cleared' }] })
      const notificationIndex = notifications.findIndex(notif => notif.notifId === notification.notifId)
      setNotifications(update(notifications, {
        $splice: [[notificationIndex, 1]]
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const markAsSeen = async () => {
    try {
      const notificationsToUpdate = notifications.filter(notification => notification.status === 'new').map(notification => ({
        ...notification,
        status: 'seen'
      }))
      if (notificationsToUpdate.length > 0) {
        await notificationApi.patchNotification({ notifications: notificationsToUpdate })
        await getPastNotifications()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const hasNew = notifications.some(notification => notification.status === 'new')

  return (
    <div className={styles.container}>
      {hasNew && <div className={`${styles.new}`}></div>}
      <ToggleableAbsoluteWrapper
        onCloseAction={true}
        onClose={markAsSeen}
        closeOnAction={false}
        wrapperClass={styles.user}
        Wrapper={({ children }) => (
          <>
            <IconClickable src={Navigation.alert} additionalClass={styles.bell} />
            {children}
          </>
        )}
        contentClass={styles['user-dropdown']}
        Content={() => (
          <NotificationList notifications={notifications} onClear={onClear} />
        )}
      />
    </div>
  )
}

export default Notification