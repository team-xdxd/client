import { capitalCase } from 'change-case'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType } from '../../../assets'
import Router from 'next/router'

const TypeBadge = ({ type, socialChannel, name, isMultiple = false, projectTask }) => {
  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }

  let projectName = null
  let projectType = null
  if (type === 'task' && projectTask) {
    projectName = `${projectTask.name}`
    projectType = projectTask.type
  }

  let projectTypeIcon = null
  if (type === 'task' && projectTask) {
    if (!projectTask.channel) {
      projectTypeIcon = ProjectType[projectTask.type]
    }
    else {
      projectTypeIcon = ProjectTypeChannel[projectTask.channel.toLowerCase()]
    }
  }

  const redirectToProject = (e) => {
    e.stopPropagation()
    Router.replace(`/main/projects/${projectTask.id}`)
  }

  return (
    <div className={`${projectTask && styles['hover-task']} ${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <div onClick={redirectToProject} className={`${styles.name} name`}>
        {name}
        <div className={`${styles['project-task']}`}><img src={projectTypeIcon} /><p>{projectName}</p></div>
      </div>
    </div>
  )
}

export default TypeBadge
