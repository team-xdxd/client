import { capitalCase } from 'change-case'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType } from '../../../assets'


const StatusBadge = ({ type, socialChannel, name, isMultiple = false }) => {
  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }
  return (
    <div className={`${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <div className={`${styles.name} name`}>
        {name}
      </div>
    </div>
  )
}

export default StatusBadge
