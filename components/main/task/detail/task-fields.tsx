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

  const times = [
    { "regular": "12:00 AM", "military": "0:00" },
    { "regular": "12:30 AM", "military": "0:30" },
    { "regular": "1:00 AM", "military": "1:00" },
    { "regular": "1:30 AM", "military": "1:30" },
    { "regular": "2:00 AM", "military": "2:00" },
    { "regular": "2:30 AM", "military": "2:30" },
    { "regular": "3:00 AM", "military": "3:00" },
    { "regular": "3:30 AM", "military": "3:30" },
    { "regular": "4:00 AM", "military": "4:00" },
    { "regular": "4:30 AM", "military": "4:30" },
    { "regular": "5:00 AM", "military": "5:00" },
    { "regular": "5:30 AM", "military": "5:30" },
    { "regular": "6:00 AM", "military": "6:00" },
    { "regular": "6:30 AM", "military": "6:30" },
    { "regular": "7:00 AM", "military": "7:00" },
    { "regular": "7:30 AM", "military": "7:30" },
    { "regular": "8:00 AM", "military": "8:00" },
    { "regular": "8:30 AM", "military": "8:30" },
    { "regular": "9:00 AM", "military": "9:00" },
    { "regular": "9:30 AM", "military": "9:30" },
    { "regular": "10:00 AM", "military": "10:00" },
    { "regular": "10:30 AM", "military": "10:30" },
    { "regular": "11:00 AM", "military": "11:00" },
    { "regular": "11:30 AM", "military": "11:30" },
    { "regular": "12:00 PM", "military": "12:00" },
    { "regular": "12:30 PM", "military": "12:30" },
    { "regular": "1:00 PM", "military": "13:00" },
    { "regular": "1:30 PM", "military": "13:30" },
    { "regular": "2:00 PM", "military": "14:00" },
    { "regular": "2:30 PM", "military": "14:30" },
    { "regular": "3:00 PM", "military": "15:00" },
    { "regular": "3:30 PM", "military": "15:30" },
    { "regular": "4:00 PM", "military": "16:00" },
    { "regular": "4:30 PM", "military": "16:30" },
    { "regular": "5:00 PM", "military": "17:00" },
    { "regular": "5:30 PM", "military": "17:30" },
    { "regular": "6:00 PM", "military": "18:00" },
    { "regular": "6:30 PM", "military": "18:30" },
    { "regular": "7:00 PM", "military": "19:00" },
    { "regular": "7:30 PM", "military": "19:30" },
    { "regular": "8:00 PM", "military": "20:00" },
    { "regular": "8:30 PM", "military": "20:30" },
    { "regular": "9:00 PM", "military": "21:00" },
    { "regular": "9:30 PM", "military": "21:30" },
    { "regular": "10:00 PM", "military": "22:00" },
    { "regular": "10:30 PM", "military": "22:30" },
    { "regular": "11:00 PM", "military": "23:00" },
    { "regular": "11:30 PM", "military": "23:30" }
  ]

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

  const handleTimeChange = (selected) => {
    const splitInput = selected.value.split(':')
    let currentDate = new Date(endDate)
    currentDate = new Date(currentDate.setHours(splitInput[0], splitInput[1]))
    editFields('endDate', currentDate)
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
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Deadline Date'
          image={ItemFields.date}
          hasOption={true}
          optionOnClick={() => toggleActiveInput('endDate')}
        >
          <span>{endDate ? format(new Date(endDate), 'MMM d, yyyy') : 'No Deadline Date'}</span>
        </ItemFieldWrapper>
        {activeInput === 'endDate' &&
          <div className={styles['day-picker']}>
            <DayPicker
              selectedDays={new Date(endDate)}
              onDayClick={handleDayClick} />
          </div>
        }
      </div>

      <div className={styles.field}>
        <ItemFieldWrapper
          title='Time'
          image={Utilities.time}
          optionOnClick={() => toggleActiveInput('time')}
        >
          {endDate ?
            <div >
              <Select
                options={times.map(time => ({ label: time.regular, value: time.military }))}
                placeholder={'Select a time'}
                value={{ value: format(new Date(endDate), 'HH:mm'), label: format(new Date(endDate), 'hh:mm a') }}
                onChange={handleTimeChange}
                styleType='filter'
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