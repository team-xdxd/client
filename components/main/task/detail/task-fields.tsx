import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import styles from './task-fields.module.css'
import { ItemFields, Utilities, ProjectTypes } from '../../../../assets'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'
import update from 'immutability-helper'
import tagApi from '../../../../server-api/tag'
import projectApi from '../../../../server-api/project'

// Components
import ItemFieldWrapper from '../../../common/item-field-wrapper'
import Select from '../../../common/select'

const TaskFields = ({
  assignedTo,
  deadlineDate,
  setDeadlineDate,
  project,
  setProject,
  description,
  setDescription,
  addTag,
  tags
}) => {

  const [activeInput, setActiveInput] = useState('')

  const [inputTags, setInputTags] = useState([])
  const [inputProjects, setInputProjects] = useState([])

  useEffect(() => {
    getTags()
    getProjects()
  }, [])

  const getTags = async () => {
    try {
      const { data } = await tagApi.getTags()
      setInputTags(data)
    } catch (err) {
      // TODO: Maybe show error?
    }
  }

  const getProjects = async () => {
    try {
      const { data } = await projectApi.getProjects()
      setInputProjects(data)
    } catch (err) {
      // TODO: Maybe show error?
    }
  }

  const toggleActiveInput = (input) => {
    if (input === activeInput)
      setActiveInput('')

    else
      setActiveInput(input)
  }

  const handleDayClick = (day, { selected }) => {
    setDeadlineDate(selected ? undefined : day)
    setActiveInput('')
  }

  const handleTagChange = async (selected, actionMeta) => {
    const newTag = await addTag(selected, actionMeta.action === 'create-option')
    if (actionMeta.action === 'create-option') {
      setInputTags(update(inputTags, { $push: [newTag] }))
    }
    toggleActiveInput('tags')
  }

  const handleProjectChange = (selected) => {
    setProject(selected)
    toggleActiveInput('project')
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Assigned To'
          image={ItemFields.member}
        >
          <span>{assignedTo?.name}</span>
        </ItemFieldWrapper>
      </div>
      <div className={`${styles.field} ${styles['field-row-last']}`}>
        <ItemFieldWrapper
          title='Deadline Date'
          image={ItemFields.date}
          hasOption={true}
          optionOnClick={() => toggleActiveInput('deadlineDate')}
        >
          <span>{deadlineDate ? format(new Date(deadlineDate), 'MMM d, yyyy') : 'No Deadline Date'}</span>
        </ItemFieldWrapper>
        {activeInput === 'deadlineDate' &&
          <div className={styles['day-picker']}>
            <DayPicker
              selectedDays={deadlineDate}
              onDayClick={handleDayClick} />
          </div>
        }
      </div>
      <hr />
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Project'
          image={ProjectTypes.project}
        >
          <span>{project?.name}</span>
          {activeInput === 'project' ?
            <div className={styles['tag-select']}>
              <Select
                options={inputProjects.map(project => ({ ...project, label: project.name, value: project.id }))}
                placeholder={'Select a project'}
                value={project ? { label: project.name, value: project.id } : null}
                onChange={handleProjectChange}
                styleType={'regular item'}
              />
            </div>
            :
            <div className={styles.add} onClick={() => toggleActiveInput('project')}>
              <img src={Utilities.add} />
              <span>Add to a Project</span>
            </div>
          }
        </ItemFieldWrapper>
      </div>
      <div className={`${styles.field} ${styles['field-row-last']}`}>
        <ItemFieldWrapper
          title='Tags'
          image={ItemFields.tag}
        >
          <span>{tags.map(tag => tag.name).join(', ')}</span>

          {activeInput === 'tags' ?
            <div className={styles['campaign-select']}>
              <CreatableSelect
                placeholder={'Enter a new tag or select an existing one'}
                options={inputTags.map(tag => ({ label: tag.name, value: tag.id }))}
                className={`regular item`}
                onChange={handleTagChange}
                classNamePrefix='select-prefix'
              />
            </div>
            :
            <div className={styles.add} onClick={() => toggleActiveInput('tags')}>
              <img src={Utilities.add} />
              <span>Add Tag</span>
            </div>
          }
        </ItemFieldWrapper>
      </div>
      <hr />
      <div className={`${styles.field} ${styles['field-wide']}`}>
        <ItemFieldWrapper
          title='Description'
          image={ItemFields.description}
        >
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter Description'
            onClick={() => toggleActiveInput('description')}
            onBlur={() => toggleActiveInput('description')}
          />
        </ItemFieldWrapper>
      </div>
    </div>
  )
}

export default TaskFields