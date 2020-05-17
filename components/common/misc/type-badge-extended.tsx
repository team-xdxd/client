import { capitalCase } from 'change-case'
import styles from './type-badge-extended.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType, Utilities } from '../../../assets'

const StatusBadge = ({ type, socialChannel, name, isMultiple = false, isLast = false, time }) => {
  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }
  return (
    <div className={`${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      {isMultiple ?
        <>
          <img src={Utilities.memberProfile} />
          <div className={`${styles.name} name`}>
            {name}
          </div>
          <div className={'type-icon'}>
            <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
          </div>
        </>
        :
        <>
          <div className={`${styles.name} ${styles['name-extended']} name`}>
            {name}
          </div>
          <div className={styles.hour}>
            {time &&
              <span>{time.toLowerCase()}</span>
            }
          </div>
          <div className={styles.icons}>
            <img src={Utilities.memberProfile} />
            <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
          </div>
        </>
      }

    </div>
  )
}

export default StatusBadge
