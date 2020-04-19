import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'

import taskApi from '../../../../server-api/task'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/item-subheader'
import ItemSublayout from '../../../common/item-sublayout'
import Fields from './task-fields'

const TaskDetail = () => {

  const [task, setTask] = useState()

  const [assignedTo, setAssignedTo] = useState()
  const [description, setDescription] = useState('')
  const [project, setProject] = useState()
  const [deadlineDate, setDeadlineDate] = useState(new Date())
  const [tags, setTags] = useState([])

  useEffect(() => {
    getTask()
  }, [])

  const getTask = async () => {
    try {
      const splitPath = window.location.pathname.split('/')
      const { data } = await taskApi.getTaskById(splitPath[splitPath.length - 1])
      setTaskData(data)
      setTask(data)
    } catch (err) {
      console.log(err)
      // TODO: Error handling
    }
  }

  const saveTask = async () => {
    try {
      const saveData = {
        description,
        deadlineDate,
        projectId: project.id
      }
      await taskApi.updateTask(task.id, saveData)
      toastUtils.success('Task saved sucesfully')
    } catch (err) {
      // TODO: Error handling
    }
  }

  const setTaskData = (data) => {
    // TODO: get the correct owner
    setAssignedTo(data.user)
    setDescription(data.description)
    setDeadlineDate(data.end_date)
    setProject(data.project)
    setTags(data.tags)
  }

  const addTag = async (tag, isNew = false) => {
    if (tags.findIndex(taskTag => tag.label === taskTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await taskApi.addTag(task.id, newTag)
        if (!isNew) {
          setTags(update(tags, { $push: [newTag] }))
        } else {
          setTags(update(tags, { $push: [data] }))
        }
        return data
      } catch (err) {
        // TODO: Error if failure for whatever reason
      }
    }
  }


  return (
    <>
      <ItemSubheader
        title={task?.name}
        saveDraft={saveTask}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout>
          {task &&
            <Fields
              assignedTo={assignedTo}
              project={project}
              setProject={setProject}
              description={description}
              setDescription={setDescription}
              deadlineDate={deadlineDate}
              setDeadlineDate={setDeadlineDate}
              tags={tags}
              addTag={addTag}
            />
          }
        </ItemSublayout>
      </main>
    </>
  )
}

export default TaskDetail
