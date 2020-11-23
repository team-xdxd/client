import styles from './detail-side-panel.module.css'
import update from 'immutability-helper'
import CreatableSelect from 'react-select/creatable';

import { AssetContext, UserContext } from '../../../context'
import { useEffect, useState, useContext } from 'react'
import { format } from 'date-fns'
import { capitalCase } from 'change-case'
import filesize from 'filesize'
import { getAssociatedCampaigns, getAssociatedChannels, getParsedExtension } from '../../../utils/asset'
import tagApi from '../../../server-api/tag'
import assetApi from '../../../server-api/asset'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import { Utilities } from '../../../assets'

import {
  CALENDAR_ACCESS
} from '../../../constants/permissions'

// Components
import Tag from '../misc/tag'
import IconClickable from '../buttons/icon-clickable'
import Select from '../inputs/select'

const SidePanel = ({ asset, updateAsset, isShare }) => {
  const {
    id,
    createdAt,
    type,
    extension,
    dimension,
    size,
    tags,
    projects,
    tasks
  } = asset

  const { assets, setAssets } = useContext(AssetContext)
  const { hasPermission } = useContext(UserContext)

  const [inputTags, setInputTags] = useState([])
  const [inputProjects, setInputProjects] = useState([])
  const [inputTasks, setInputTasks] = useState([])

  const [assetTags, setTags] = useState(tags)
  const [activeDropdown, setActiveDropdown] = useState('')

  useEffect(() => {
    if (!isShare) {
      getTagsInputData()
      if (hasPermission([CALENDAR_ACCESS])) {
        getInputData()
      }
    }
  }, [])

  const getInputData = async () => {
    try {
      const projectsResponse = await projectApi.getProjects()
      setInputProjects(projectsResponse.data)
      const tasksResponse = await taskApi.getTasks()
      setInputTasks(tasksResponse.data)
    } catch (err) {
      // TODO: Maybe show error?
    }
  }

  const getTagsInputData = async () => {
    try {
      const tagsResponse = await tagApi.getTags()
      setInputTags(tagsResponse.data)
    } catch (err) {
      // TODO: Maybe show error?
    }
  }

  const addTag = async (tag, isNew = false) => {
    if (tags.findIndex(assetTag => tag.label === assetTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await assetApi.addTag(id, newTag)
        let stateTagsUpdate
        if (!isNew) {
          stateTagsUpdate = update(assetTags, { $push: [newTag] })
          setTags(stateTagsUpdate)
        } else {
          stateTagsUpdate = update(assetTags, { $push: [data] })
          setTags(stateTagsUpdate)
          setInputTags(update(inputTags, { $push: [data] }))
        }
        updateAssetState({
          tags: { $set: stateTagsUpdate }
        })
        setActiveDropdown('')
        return data
      } catch (err) {
        // TODO: Error if failure for whatever reason
        setActiveDropdown('')
      }
    } else {
      setActiveDropdown('')
    }
  }

  const removeTag = async (index) => {
    try {
      let stateTagsUpdate = update(assetTags, { $splice: [[index, 1]] })
      setTags(stateTagsUpdate)
      await assetApi.removeTag(id, assetTags[index].id)
      updateAssetState({
        tags: { $set: stateTagsUpdate }
      })
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  const updateAssetState = (updatedata) => {
    const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === id)
    setAssets(update(assets, {
      [assetIndex]: {
        asset: updatedata
      }
    }))
    setActiveDropdown('')
  }

  const handleTagChange = async (selected, actionMeta) => {
    const newTag = await addTag(selected, actionMeta.action === 'create-option')
    if (actionMeta.action === 'create-option') {
      setInputTags(update(inputTags, { $push: [newTag] }))
    }
  }

  const handleAssociationChange = async (id, type, operation) => {
    // Only perform operations if item exists/are abcent
    if (operation === 'add') {
      if (asset[type].findIndex(item => item.id === id) !== -1) return
    } else if (operation === 'remove') {
      if (asset[type].findIndex(item => item.id === id) === -1) return
    }
    updateAsset({
      updateData: {}, associations: {
        [type]: {
          [operation]: [id]
        }
      }
    })
    setActiveDropdown('')
  }

  let formattedDimension
  if (dimension) {
    const splitDimension = dimension.split(',')
    formattedDimension = `${splitDimension[0]} x  ${splitDimension[1]} px`
  }

  const fieldValues = [
    {
      field: 'Created',
      value: format(new Date(createdAt), 'Pp')
    },
    {
      field: 'Type',
      value: capitalCase(type)
    },
    {
      field: 'Extension',
      value: getParsedExtension(extension)
    },
    {
      field: 'Dimension',
      value: formattedDimension
    },
    {
      field: 'Size',
      value: filesize(size)
    },
    {
      field: 'Campaigns',
      value: getAssociatedCampaigns(asset)
    },
    {
      field: 'Channels',
      value: getAssociatedChannels(asset)
    }
  ]

  return (
    <div className={styles.container}>
      <h2>Details</h2>
      {fieldValues.map(fieldvalue => (
        <div className={styles['field-wrapper']} key={fieldvalue.field}>
          <div className={`secondary-text ${styles.field}`}>{fieldvalue.field}</div>
          <div className={'normal-text'}>{fieldvalue.value}</div>
        </div>
      ))}

      <div className={styles['field-wrapper']} >
        <div className={`secondary-text ${styles.field}`}>Tags</div>
        <div className={'normal-text'}>
          <ul className={`tags-list ${styles['tags-list']}`}>
            {assetTags?.map((tag, index) => (
              <li key={tag.id}>
                <Tag
                  tag={tag.name}
                  canRemove={!isShare}
                  removeFunction={() => removeTag(index)}
                />
              </li>
            ))}
          </ul>
          {!isShare &&
            <>
              {activeDropdown === 'tags' ?
                <div className={`tag-select ${styles['select-wrapper']}`}>
                  <CreatableSelect
                    placeholder={'Enter a new tag or select an existing one'}
                    options={inputTags.map(tag => ({ label: tag.name, value: tag.id }))}
                    className={`regular item`}
                    onChange={handleTagChange}
                    classNamePrefix='select-prefix'
                    menuPlacement={'top'}
                    isClearable={true}
                  />
                </div>
                :
                <div className={`add ${styles['select-add']}`} onClick={() => setActiveDropdown('tags')}>
                  <IconClickable src={Utilities.add} />
                  <span>Add Tag</span>
                </div>
              }
            </>
          }
        </div>
      </div>

      <div className={styles['field-wrapper']} >
        <div className={`secondary-text ${styles.field}`}>Projects</div>
        <div className={'normal-text'}>
          <ul className={`tags-list ${styles['tags-list']}`}>
            {projects?.map((project, index) => (
              <li key={project.id}>
                <Tag
                  altColor='turquoise'
                  tag={project.name}
                  canRemove={!isShare}
                  removeFunction={() => handleAssociationChange(project.id, 'projects', 'remove')}
                />
              </li>
            ))}
          </ul>
          {!isShare && hasPermission([CALENDAR_ACCESS]) &&
            <>
              {activeDropdown === 'projects' ?
                <div className={`tag-select ${styles['select-wrapper']}`}>
                  <Select
                    options={inputProjects.map(project => ({ ...project, label: project.name, value: project.id }))}
                    placeholder={'Select a project'}
                    onChange={(selected) => handleAssociationChange(selected.value, 'projects', 'add')}
                    styleType={'regular item'}
                    menuPlacement={'top'}
                    isClearable={true}
                  />
                </div>
                :
                <div className={`add ${styles['select-add']}`} onClick={() => setActiveDropdown('projects')}>
                  <IconClickable src={Utilities.add} />
                  <span>Add to Project</span>
                </div>
              }
            </>
          }
        </div>
      </div>

      <div className={styles['field-wrapper']} >
        <div className={`secondary-text ${styles.field}`}>Tasks</div>
        <div className={'normal-text'}>
          <ul className={`tags-list ${styles['tags-list']}`}>
            {tasks?.map((task, index) => (
              <li key={task.id}>
                <Tag
                  altColor='yellow'
                  tag={task.name}
                  canRemove={!isShare}
                  removeFunction={() => handleAssociationChange(task.id, 'tasks', 'remove')}
                />
              </li>
            ))}
          </ul>
          {!isShare && hasPermission([CALENDAR_ACCESS]) &&
            <>
              {activeDropdown === 'tasks' ?
                <div className={`tag-select ${styles['select-wrapper']}`}>
                  <Select
                    options={inputTasks.map(task => ({ ...task, label: task.name, value: task.id }))}
                    placeholder={'Select a task'}
                    onChange={(selected) => handleAssociationChange(selected.value, 'tasks', 'add')}
                    styleType={'regular item'}
                    menuPlacement={'top'}
                    isClearable={true}
                  />
                </div>
                :
                <div className={`add ${styles['select-add']}`} onClick={() => setActiveDropdown('tasks')}>
                  <IconClickable src={Utilities.add} />
                  <span>Add to Task</span>
                </div>
              }
            </>
          }
        </div>
      </div>

    </div >
  )
}

export default SidePanel