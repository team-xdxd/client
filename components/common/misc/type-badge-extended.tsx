import { capitalCase } from 'change-case'
import styles from './type-badge-extended.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType, Utilities } from '../../../assets'

// Components
import UserPhoto from '../../common/user/user-photo'

const TypeBadgeExtended = ({ type, socialChannel, name, photo, isMultiple = false, isLast = false, time, projectTask }) => {
  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }
  let projectName = null
  if(type === 'task'){
    projectName = `${projectTask} > `
  }

  return (
    <div className={`${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      {isMultiple ?
        <>
          <UserPhoto sizePx={22} photoUrl={photo} />
          <div className={`${styles.name} name`}>
            {name}
          </div>
          <div className={'type-icon'}>
            <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
          </div>
        </>
        :
        <>
          <div className={styles.row}>
            <div className={`${styles.name} ${styles['name-extended']} name`}>
              {name}
            </div>
            <div className={`${styles['more-task']}`}>
              <img src={Utilities.more} />
            </div>
          </div>
          <div className={styles.hour}>
            {time &&
              <span>{time.toLowerCase()}</span>
            }
          </div>
          <div className={styles.icons}>
            <UserPhoto sizePx={22} photoUrl={photo} />
            <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
          </div>
        </>
      }

    </div>
  )
}

export default TypeBadgeExtended
