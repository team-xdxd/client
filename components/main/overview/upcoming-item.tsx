import styles from './upcoming-item.module.css'
import { Utilities, Navigation, ItemFields } from '../../../assets'
import { format } from 'date-fns'
import Router from 'next/router'
import { useState } from 'react'

// Component
import StatusBadge from '../../common/misc/status-badge'
import Dropdown from '../../common/inputs/dropdown'

const UpcomingItem = ({ name, date, status, users, userPhoto = ItemFields.member, detailUrl, deleteItem }) => {

  const [moreVisible, setMoreVisible] = useState(false)

  const toggleVisible = () => {
    setMoreVisible(!moreVisible)
  }

  return (
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
        <img src={Utilities.commentLight} />
        <img src={Navigation.scheduleLight} />
        <img src={Utilities.assignMemberLight} />
        <img className={styles['more-icon']} src={Utilities.moreLighter} onClick={toggleVisible} />
        {moreVisible &&
          <div className={styles.more}>
            <Dropdown
              options={[{ label: 'Delete' }]}
              onClick={() => {
                toggleVisible()
                deleteItem()
              }}
            />
          </div>
        }
      </div>
    </li>
  )
}

export default UpcomingItem
