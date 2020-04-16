import styles from './upcoming-item.module.css'
import { GeneralImg, Utilities, Navigation } from '../../../assets'
import { format } from 'date-fns'
import Router from 'next/router'

// Component
import StatusBadge from '../../common/misc/status-badge'

const UpcomingItem = ({ name, date, status, users, userPhoto = GeneralImg.logo, detailUrl }) => (
  <li className={`${styles.container}`}>
    <span className={styles.name} onClick={() => Router.replace(detailUrl)}>
      {name}
    </span>

    <div className={styles.user}>
      {users.length <= 1 ?
        <div className={styles['single-user']}>
          <img src={userPhoto} />
          <span>{users[0].name}</span>
        </div>
        :
        <ul>
          {users.map((user, index) => {
            if (index < 3)
              return (
                <li>
                  <img src={userPhoto} />
                </li>
              )
          })}
        </ul>
      }
    </div>

    <span className={styles.date}>
      {date && format(new Date(date), 'd MMM yyyy')}
    </span>
    <div className={styles.badge}>
      <StatusBadge status={status} />
    </div>
    <div className={styles.actions}>
      <img src={Utilities.comment} />
      <img src={Navigation.scheduleBlack} />
      <img src={Utilities.assignMember} />
      <img src={Utilities.more} />
    </div>
  </li>
)

export default UpcomingItem
