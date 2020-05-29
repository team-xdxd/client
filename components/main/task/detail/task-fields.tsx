import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import styles from './task-fields.module.css'
import TimePicker from 'react-time-picker/dist/entry.nostyle'
import { ItemFields, Utilities, ProjectTypes } from '../../../../assets'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'
import update from 'immutability-helper'
import tagApi from '../../../../server-api/tag'
import projectApi from '../../../../server-api/project'

// Components
import ItemFieldWrapper from '../../../common/items/item-field-wrapper'
import Select from '../../../common/inputs/select'
import Tag from '../../../common/misc/tag'
import ToggleableAbsoluteWrapper from '../../../common/misc/toggleable-absolute-wrapper'

const TaskFields = ({
  editableFields: {
    endDate,
    project,
    description,
    tags
  },
  addTag,
  removeTag,
  editFields,
  task
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
    editFields('endDate', selected ? undefined : day)
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
    editFields('project', selected)
    toggleActiveInput('project')
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Assigned To'
          image={ItemFields.member}
        >
          <span>{task?.users[0].name}</span>
        </ItemFieldWrapper>
      </div>
      <ToggleableAbsoluteWrapper
        closeOnAction={false}
        wrapperClass={styles.field}
        Wrapper={({ children }) => (
          <>
            <ItemFieldWrapper
              title='Deadline Date'
              image={ItemFields.date}
              hasOption={true}
              optionOnClick={() => toggleActiveInput('endDate')}
            >
              <span>{endDate ? format(new Date(endDate), 'MMM d, yyyy') : 'No Deadline Date'}</span>
            </ItemFieldWrapper>
            {children}
          </>
        )}
        contentClass={styles['day-picker']}
        Content={() => (
          <DayPicker
            selectedDays={new Date(endDate)}
            onDayClick={handleDayClick} />
        )}
      />
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Time'
          image={Utilities.time}
          optionOnClick={() => toggleActiveInput('time')}
        >
          {endDate ?
            <div>
              <TimePicker
                disableClock={true}
                className='detail-time'
                onChange={(date) => {
                  const splitInput = date.split(':')
                  let currentDate = new Date(endDate)
                  currentDate = new Date(currentDate.setHours(splitInput[0], splitInput[1]))
                  editFields('endDate', currentDate)
                }}
                value={format(new Date(endDate), 'HH:mm')}
              />
            </div>
            :
            <span>No Deadline Date</span>
          }
        </ItemFieldWrapper>
      </div>
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
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Tags'
          image={ItemFields.tag}
        >
          <ul className={'tags-list'}>
            {tags.map((tag, index) => (
              <li key={index}>
                <Tag
                  tag={tag.name}
                  canRemove={true}
                  removeFunction={() => removeTag(index)}
                />
              </li>
            ))}
          </ul>

          {activeInput === 'tags' ?
            <div className={'campaign-select'}>
              <CreatableSelect
                placeholder={'Enter a new tag or select...'}
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
      <div className={`${styles['field-column-last']} ${styles['field']}`}>
        <ItemFieldWrapper
          title='Description'
          image={ItemFields.description}
        >
          <textarea
            rows={description?.length > 0 ? Math.ceil(description.length / 50) : 1}
            value={description}
            onChange={(e) => editFields('description', e.target.value)}
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