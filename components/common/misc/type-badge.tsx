import { capitalCase } from 'change-case'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType } from '../../../assets'


const TypeBadge = ({ type, socialChannel, name, isMultiple = false, projectTask}) => {
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
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <div className={`${styles.name} name`}>
        <div className={`${styles['project-task']}`}>{projectName}</div>{name}
      </div>
    </div>
  )
}

export default TypeBadge
