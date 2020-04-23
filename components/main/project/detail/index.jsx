import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'
import projectApi from '../../../../server-api/project'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/items/item-subheader'
import ItemSublayout from '../../../common/layouts/item-sublayout'
import TasksList from './tasks-list'
import Fields from './project-fields'

const ProjectDetail = () => {

  const [project, setProject] = useState()

  const [projectNames, setProjectNames] = useState([])

  const [tasks, setTasks] = useState([])

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
    // TODO: get the correct owner
    setEditableFields({
      ...editableFields,
      ...data,
      owner: data.users[0]
    })
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
      // TODO: Error if failure for whatever reason
    }
  }

  const createTask = async (data) => {
    try {
      const newTaskResponse = await projectApi.addtask(project.id, data)
      setTasks(update(tasks, { $push: [newTaskResponse.data] }))
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  const removeTask = async (taskId) => {
    try {
      await projectApi.removeTask(project.id, taskId)
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
        title={editableFields.name}
        saveDraft={saveProject}
        changeName={(name) => editFields('name', name)}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout
          SideComponent={
            <TasksList
              tasks={tasks}
              createTask={createTask}
              removeTask={removeTask}
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
