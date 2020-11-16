import { capitalCase } from 'change-case'
import { useRef, useState, useEffect } from 'react'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType, Utilities } from '../../../assets'
import Router from 'next/router'
import detectIt from 'detect-it'

import ToggleableAbsoluteWrapper from './toggleable-absolute-wrapper'
import Dropdown from '../inputs/dropdown'

const TypeBadge = ({ type, socialChannel, name, isMultiple = false, projectTask, dropdownOptions = [] }) => {

  const [showProjectTask1, setShowProjectTask1] = useState('')
  const [showProjectTask2, setShowProjectTask2] = useState('')

  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }

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

  const hoverOnMobile = (e) => {
    if (projectTask && detectIt.deviceType === 'touchOnly') {
      e.stopPropagation()
      setShowProjectTask1('hoverMobileClass1')
      setShowProjectTask2('hoverMobileClass2')
      if (showProjectTask1) {
        setShowProjectTask1('')
        setShowProjectTask2('')
        Router.replace(`/main/projects/${projectTask.id}`)
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (projectRef.current && !projectRef.current.contains(e.target)) {
        setShowProjectTask1('')
        setShowProjectTask2('')
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [projectRef])

  const redirectProject = (e) => {
    e.stopPropagation()
    Router.replace(`/main/projects/${projectTask.id}`)
  }

  return (
    <div onClick={hoverOnMobile} ref={projectRef}
      className={`${projectTask && styles['hover-task']} ${projectTask && styles[showProjectTask1]} ${styles[type]} ${styles.container} ${isMultiple && styles.multiple} type-badge`}>
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <div className={`${styles.name} name`}>
        {name}
        <div onClick={redirectProject} className={`${styles['project-task']} ${projectTask && styles[showProjectTask2]}`}><img src={projectTypeIcon} /><p>{projectName}</p></div>
      </div>
      {dropdownOptions.length > 0 &&
        <ToggleableAbsoluteWrapper
          wrapperClass={`${styles['more-task']}`}
          Wrapper={({ children }) => (
            <>
              <img src={Utilities.more} />
              {children}
            </>
          )}
          Content={() => {
            return (
              <Dropdown
                options={dropdownOptions}
              />
            )
          }}
        />
      }
    </div>
  )
}

export default TypeBadge
