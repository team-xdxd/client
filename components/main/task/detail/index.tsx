import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'
import Router from 'next/router'
import taskApi from '../../../../server-api/task'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/items/item-subheader'
import ItemSublayout from '../../../common/layouts/item-sublayout'
import Fields from './task-fields'

const TaskDetail = () => {

  const [task, setTask] = useState()

  const [taskNames, setTaskNames] = useState([])

  const [status, setStatus] = useState('')

  const [editableFields, setEditableFields] = useState({
    name: '',
    description: '',
    project: null,
    endDate: null,
    tags: []
  })

  useEffect(() => {
    getTask()
    getTaskNames()
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

  const deleteTask = async () => {
    try {
      await taskApi.deleteTask(task?.id)
      Router.replace('/main/overview')
      toastUtils.success('Task deleted sucesfully')
    } catch (err) {
      console.log(err)
      // TODO: Handle error
    }
  }

  const getTaskNames = async () => {
    try {
      const { data } = await taskApi.getTasks()
      setTaskNames(data.map(task => task.name))
    } catch (err) {
      // TODO: Error handling
    }
  }

  const saveTask = async () => {
    if (!editableFields.endDate) {
      return toastUtils.error('You must add a Deadline Date')
    }
    if (!editableFields.name) {
      return toastUtils.error('The name cannot be empty')
    }
    if (editableFields.name !== task?.name && taskNames.includes(editableFields.name)) {
      return toastUtils.error('A task with that name already exists')
    }
    try {
      const saveData = {
        name: editableFields.name,
        description: editableFields.description,
        endDate: editableFields.endDate,
        projectId: editableFields.project?.id
      }
      const { data } = await taskApi.updateTask(task?.id, saveData)
      getTaskNames()
      setTask(data)
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
    setStatus(data.status)
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

  const changeStatus = async (newStatus) => {
    if (!editableFields.endDate) {
      return toastUtils.error('You must add an Deadline Date')
    }

    try {
      setStatus(newStatus)
      await saveTask()
      await taskApi.updateTask(task.id, { status: newStatus })
    } catch (err) {
      // TODO: Error if failure for whatever reason
      console.log(err);
    }
  }

  return (
    <>
      <ItemSubheader
        title={editableFields.name}
        saveDraft={saveTask}
        changeName={(name) => editFields('name', name)}
        status={status}
        changeStatus={changeStatus}
        resetPageTittle={() => editFields('name', task?.name)}
        hasAssets={true}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout
          deleteItem={deleteTask}
          type='task'
          layout='single'
          itemId={task?.id}
          hasAssets={true}
        >
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
