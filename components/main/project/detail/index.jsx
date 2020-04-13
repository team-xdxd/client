import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'
import projectApi from '../../../../server-api/project'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/item-subheader'
import ItemSublayout from '../../../common/item-sublayout'
import Fields from './project-fields'
import { set } from 'date-fns'

const ProjectDetail = () => {

  const [project, setProject] = useState()

  const [collaborators, setCollaborators] = useState([])
  const [description, setDescription] = useState('')
  const [campaign, seCampaign] = useState()
  const [publishDate, setPublishDate] = useState(new Date())
  const [owner, setOwner] = useState()
  const [tags, setTags] = useState([])

  useEffect(() => {
    getProject()
  }, [])

  const getProject = async () => {
    try {
      const splitPath = window.location.pathname.split('/')
      const { data } = await projectApi.getProjectById(splitPath[splitPath.length - 1])
      setProjectData(data)
      setProject(data)
    } catch (err) {
      // TODO: Error handling
    }
  }

  const saveProject = async () => {
    try {
      const saveDate = {
        description,
        endDate
      }
      await projectApi.updateProject(project.id, saveDate)
      toastUtils.success('Project saved sucesfully')
    } catch (err) {
      // TODO: Error handling
    }
  }

  const setProjectData = (data) => {
    // TODO: get the correct owner
    setOwner(data.users[0])
    setCollaborators(data.users)
    setDescription(data.description)
    setEndDate(data.endDate)
    setTags(data.tags)
  }

  const addTag = async (tag, isNew = false) => {
    if (tags.findIndex(projectTag => tag.label === projectTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await projectApi.addTag(project.id, newTag)
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
        title={project?.name}
        saveDraft={saveProject}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout >
          {project &&
            <Fields
              collaborators={collaborators}
              campaign={campaign}
              seCampaign={seCampaign}
              description={description}
              setDescription={setDescription}
              publishDate={publishDate}
              setPublishDate={setPublishDate}
              owner={owner}
              tags={tags}
              setTags={setTags}
              setCollaborators={setCollaborators}
              addTag={addTag}
            />
          }
        </ItemSublayout>
      </main>
    </>
  )
}

export default ProjectDetail
