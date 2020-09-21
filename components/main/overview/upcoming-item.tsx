import styles from './upcoming-item.module.css'
import { Utilities, Navigation } from '../../../assets'
import { format } from 'date-fns'
import Router from 'next/router'
import urlUtils from '../../../utils/url'

// Component
import StatusBadge from '../../common/misc/status-badge'
import ToggleableAbsoluteWrapper from '../../common/misc/toggleable-absolute-wrapper'
import Dropdown from '../../common/inputs/dropdown'
import UserPhoto from '../../common/user/user-photo'

const UpcomingItem = ({ name, date, status, users, detailUrl, deleteItem }) => (
  <li className={`${styles.container}`}>
    <span className={styles.name} onClick={() => Router.replace(detailUrl)}>
      {name}
    </span>

    <div className={styles.user}>
      {users.length <= 1 ?
        <div className={styles['single-user']}>
          <UserPhoto photoUrl={users[0].profilePhoto} sizePx={30} />
          <span>{users[0].name}</span>
        </div>
        :
        <ul className={styles['multiple-users']}>
          {users.map((user, index) => {
            if (index < 3)
              return (
                <li>
                  <UserPhoto photoUrl={user.profilePhoto} sizePx={30} />
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
      <img className={styles['edit-icon']}
        src={Utilities.commentLight}
        onClick={() => Router.replace(`${detailUrl}?${urlUtils.encodeQueryParameters({ side: 'comments' })}`)} />
      <img className={styles['edit-icon']}
        src={Navigation.scheduleLight}
        onClick={() => Router.replace(detailUrl)} />
      <img className={styles['edit-icon']}
        src={Utilities.assignMemberLight}
        onClick={() => Router.replace(detailUrl)} />
      <ToggleableAbsoluteWrapper
        wrapperClass={styles['img-wrap']}
        Wrapper={({ children }) => (
          <>
            <img className={styles['more-icon']} src={Utilities.moreLighter} />
            {children}
          </>
        )}
        Content={() => (
          <div className={styles.more} >
            <Dropdown
              options={[{ label: 'Delete', onClick: deleteItem }]}
            />
          </div>
        )}
      />
    </div>
  </li>
)

export default UpcomingItem
