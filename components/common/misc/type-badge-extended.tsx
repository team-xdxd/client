import { capitalCase } from 'change-case'
import styles from './type-badge-extended.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType, Utilities } from '../../../assets'

const StatusBadge = ({ type, socialChannel, name, isMultiple = false, isLast = false }) => {
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
          <img className={isLast && 'last-image'} src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
        </>
        :
        <>
          <div className={`${styles.name} name`}>
            {name}
          </div>
          <div className={styles.hour}>
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
