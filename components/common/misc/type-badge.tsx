import { capitalCase } from 'change-case'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType } from '../../../assets'


const TypeBadge = ({ type, socialChannel, name, isMultiple = false, projectTask}) => {
  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }

  let projectName = null
  let projectType = null
  if(type === 'task'){
    projectName = `${projectTask.name}`
    projectType = projectTask.type
  }

  let projectTypeIcon = null
  if (type === 'task'){
    if (projectType !== 'social') {
      projectTypeIcon = ProjectType[projectTask.type]
    }
    else {
      projectTypeIcon = ProjectTypeChannel[projectTask.channel]
    }
  }

  return (
    <div className={`${projectTask && styles['hover-task']} ${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <div className={`${styles.name} name`}>
        {name}
        <div className={`${styles['project-task']}`}><img src={projectTypeIcon} /><p>{projectName}</p></div>
      </div>
    </div>
  )
}

export default TypeBadge
