import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'
import projectApi from '../../../../server-api/project'
import taskApi from '../../../../server-api/task'
import toastUtils from '../../../../utils/toast'
import { ProjectTypes } from '../../../../assets'

// Components
import ItemSubheader from '../../../common/items/item-subheader'
import ItemSublayout from '../../../common/layouts/item-sublayout'
import TasksList from './tasks-list'
import Fields from './project-fields'

const ProjectDetail = () => {

  const [project, setProject] = useState()

  const [projectNames, setProjectNames] = useState([])

  const [tasks, setTasks] = useState([])

  const [status, setStatus] = useState('')

  const [editableFields, setEditableFields] = useState({
    name: '',
    headline: '',
    subject: '',
    preheader: '',
    collaborators: [],
    description: '',
    campaign: null,
    startDate: null,
    publishDate: null,
    owner: null,
    tags: [],
    channel: null
  })

  useEffect(() => {
    getProject()
    getProjectNames()
  }, [])

  const getProject = async () => {
    try {
      const splitPath = window.location.pathname.split('/')
      const { data } = await projectApi.getProjectById(splitPath[splitPath.length - 1])
      setProjectData(data)
      setProject(data)
    } catch (err) {
      console.log(err)
      // TODO: Error handling
    }
  }

  const getProjectNames = async () => {
    try {
      const { data } = await projectApi.getProjects()
      setProjectNames(data.map(project => project.name))
    } catch (err) {
      // TODO: Error handling
    }
  }

  const saveProject = async () => {
    if (!editableFields.name) {
      return toastUtils.error('The name cannot be empty')
    }
    if (editableFields.name !== project.name && projectNames.includes(editableFields.name)) {
      return toastUtils.error('A project with that name already exists')
    }
    try {
      const saveData = {
        name: editableFields.name,
        description: editableFields.description,
        startDate: editableFields.startDate,
        publishDate: editableFields.publishDate,
        channel: editableFields.channel,
        campaignId: editableFields.campaign?.id,

        headline: editableFields.headline,
        subject: editableFields.subject,
        preheader: editableFields.preheader
      }      
      const { data } = await projectApi.updateProject(project.id, saveData)
      getProjectNames()
      setProject(data)
      toastUtils.success('Project saved sucesfully')
    } catch (err) {
      // TODO: Error handling
      console.log(err)
    }
  }

  const setProjectData = (data) => {
    console.log(data)
    // TODO: get the correct owner
    setEditableFields({
      ...editableFields,
      ...data,
      owner: data.users[0]
    })
    setStatus(data.status)
    setTasks(data.tasks)
  }

  const addTag = async (tag, isNew = false) => {
    if (editableFields.tags.findIndex(projectTag => tag.label === projectTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await projectApi.addTag(project.id, newTag)
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
      await projectApi.removeTag(project.id, editableFields.tags[index].id)
    } catch (err) {
      console.log(err)
      // TODO: Error if failure for whatever reason
    }
  }

  const createTask = async (data) => {
    try {
      const newTaskResponse = await projectApi.addtask(project.id, data)
      setTasks(update(tasks, { $push: [newTaskResponse.data] }))
    } catch (err) {
      console.log(err)
      // TODO: Error if failure for whatever reason
    }
  }

  const updateTask = async (index, data) => {
    try {
      setTasks(update(tasks, { [index]: { $merge: data } }))
      await taskApi.updateTask(tasks[index].id, data)
    } catch (err) {
      console.log(err)
      // TODO: Error if failure for whatever reason
    }
  }

  const removeTask = async (index) => {
    try {
      await taskApi.deleteTask(tasks[index].id)
      setTasks(update(tasks, { $splice: [[index, 1]] }))
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  const editFields = (field, value) => {
    console.log(value)
    setEditableFields({
      ...editableFields,
      [field]: value
    })
  }

  const changeStatus = async (newStatus) => {
    try{
      setStatus(newStatus)
      await projectApi.updateProject(project.id, {status: newStatus})
      toastUtils.success('Project scheduled sucesfully')
    } catch (err) {
      // TODO: Error if failure for whatever reason
      console.log(err);
    }
  }

  return (
    <>
      <ItemSubheader
        title={editableFields.name}
        saveDraft={saveProject}
        status={status}
        changeName={(name) => editFields('name', name)}
        schedule={changeStatus}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout
          navElements={[
            { icon: ProjectTypes.task }
          ]}
          SideComponent={
            <TasksList
              tasks={tasks}
              createTask={createTask}
              removeTask={removeTask}
              updateTask={updateTask}
            />
          }
        >
          {project &&
            <Fields
              project={project}
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

export default ProjectDetail
