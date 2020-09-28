import styles from './notification-list.module.css'
import Router from 'next/router'
import { format } from 'date-fns'

// Components

const NotificationList = ({ notifications, onClear }) => (
  <ul className={styles.list}>
    {notifications.length === 0 &&
      'You don\'t have any new notifications'
    }
    {notifications.map(notification => {

      const content = JSON.parse(notification.item).content
      const formattedContent = content.length > 65 ?
        `"${content.substring(0, 65)}..."` : `"${content}"`

      const date = new Date(notification.timestamp * 1000)

      const urlIndex = notification.url.indexOf('/main')
      const realUrl = notification.url.substring(urlIndex, notification.url.length)

      return (
        <li className={styles.notification} key={notification.notifId}>
          <div className={`${styles[notification.status]}`}></div>
          <div className={styles.date}>
            <div>
              {format(date, 'MMM d')}
            </div>
            <div>
              {format(date, 'p')}
            </div>
          </div>
          <div className={styles.message} onClick={() => Router.replace(realUrl)}>
            <div>
              {notification.message}
            </div>
            <div className={styles.content}>
              {formattedContent}
            </div>
          </div>
          <div className={styles.clear} onClick={() => onClear(notification)}>clear</div>
        </li>
      )
    })}
  </ul>
)

export default NotificationList