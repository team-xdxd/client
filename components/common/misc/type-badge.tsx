import { capitalCase } from 'change-case'
import { useRef, useState } from 'react'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType } from '../../../assets'
import Router from 'next/router'
import detectIt from 'detect-it';

const TypeBadge = ({ type, socialChannel, name, isMultiple = false, projectTask }) => {

  const [showProjectTask, setShowProjectTask] = useState(false)

  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }

  const taskRef = useRef(null)
  const projectRef = useRef(null)

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

  // const redirectToProject = (e) => {
  //   e.stopPropagation()
  //   Router.replace(`/main/projects/${projectTask.id}`)
  // }

  const hoverOnMobile = (e) => {
    if (detectIt.deviceType === 'touchOnly') {
      e.stopPropagation()
      //taskRef.current.classList.add('test')
      setShowProjectTask(true)
      
    } else {
      e.stopPropagation()
      Router.replace(`/main/projects/${projectTask.id}`)
    }
  }

  console.log(detectIt.deviceType)
  console.log(showProjectTask)

  return (
    <div ref={projectRef} onClick={hoverOnMobile} className={`${projectTask && showProjectTask && styles['hover-task']} ${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <div className={`${styles.name} name`}>
        {name}
        <div ref={taskRef} className={`${styles['project-task']}`}><img src={projectTypeIcon} /><p>{projectName}</p></div>
      </div>
    </div>
  )
}

export default TypeBadge
