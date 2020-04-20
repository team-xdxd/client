import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'

import taskApi from '../../../../server-api/task'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/items/item-subheader'
import ItemSublayout from '../../../common/layouts/item-sublayout'
import Fields from './task-fields'

const TaskDetail = () => {

  const [task, setTask] = useState()

  const [editableFields, setEditableFields] = useState({
    description: '',
    project: null,
    endDate: null,
    tags: []
  })

  useEffect(() => {
    getTask()
  }, [])

  const getTask = async () => {
    try {
      const splitPath = window.location.pathname.split('/')
      const { data } = await taskApi.getTaskById(splitPath[splitPath.length - 1])
      console.log(data);
            
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
        description: editableFields.description,
        endDate: editableFields.endDate,
        projectId: editableFields.project?.id
      }
      await taskApi.updateTask(task?.id, saveData)
      toastUtils.success('Task saved sucesfully')
    } catch (err) {
      // TODO: Error handling
    }
  }

  const setTaskData = (data) => {
    // TODO: get the correct owner
    setEditableFields({
      ...editableFields,
      ...data
    })
  }

  const addTag = async (tag, isNew = false) => {
    if (editableFields.tags.findIndex(projectTag => tag.label === projectTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await taskApi.addTag(task?.id, newTag)
        if (!isNew) {
          editFields('tags', update(editableFields.tags, { $push: [newTag] }))
        } else {
          editFields('tags', update(editableFields.tags, { $push: [data] }))
        }
        return data
      } catch (err) {
        // TODO: Error if failure for whatever reason
      }
    }
  }

  const removeTag = async (index) => {
    try {
      editFields('tags', update(editableFields.tags, { $splice: [[index, 1]] }))
      await taskApi.removeTag(task?.id, editableFields.tags[index].id)
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  const editFields = (field, value) => {
    setEditableFields({
      ...editableFields,
      [field]: value
    })
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
            task={task}
            editableFields={editableFields}
            editFields={editFields}
            addTag={addTag}
            removeTag={removeTag}
            />
          }
        </ItemSublayout>
      </main>
    </>
  )
}

export default TaskDetail
