import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import styles from './campaign-fields.module.css'
import { GeneralImg } from '../../../../assets'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'
import update from 'immutability-helper'
import tagApi from '../../../../server-api/tag'

// Components
import ItemFieldWrapper from '../../../common/item-field-wrapper'

const CampaignFields = ({
  owner,
  endDate,
  setEndDate,
  collaborators,
  setCollaborators,
  description,
  setDescription,
  addTag,
  tags
}) => {

  const [activeInput, setActiveInput] = useState('')

  const [inputTags, setInputTags] = useState([])

  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    try {
      const { data } = await tagApi.getTags()
      setInputTags(data)
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
    setEndDate(selected ? undefined : day)
    setActiveInput('')
  }

  const handleTagChange = async (selected, actionMeta) => {
    const newTag = await addTag(selected, actionMeta.action === 'create-option')
    if (actionMeta.action === 'create-option') {
      setInputTags(update(inputTags, { $push: [newTag] }))
    }
    toggleActiveInput('tags')
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Owner'
          image={GeneralImg.logo}
        >
          <span>{owner?.name}</span>
        </ItemFieldWrapper>
      </div>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='End Date'
          image={GeneralImg.logo}
          hasOption={true}
          optionOnClick={() => toggleActiveInput('endDate')}
        >
          <span>{endDate ? format(new Date(endDate), 'MMM d, yyyy') : 'No End Date'}</span>
        </ItemFieldWrapper>
        {activeInput === 'endDate' &&
          <div className={styles['day-picker']}>
            <DayPicker
              selectedDays={endDate}
              onDayClick={handleDayClick} />
          </div>
        }
      </div>
      <div onClick={() => toggleActiveInput('collaborators')} className={styles.field}>
        <ItemFieldWrapper
          title='Collaborators'
          image={GeneralImg.logo}
        >
          {/* TODO: Add images of collaborators when teams are implemented */}
          <div className={styles.add}>
            <img src={GeneralImg.logo} />
            <span>Add Collaborator</span>
          </div>
        </ItemFieldWrapper>
      </div>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Tags'
          image={GeneralImg.logo}
        >
          <span>{tags.map(tag => tag.name).join(', ')}</span>

          {activeInput === 'tags' ?
            <div className={styles['tag-select']}>
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
              <img src={GeneralImg.logo} />
              <span>Add Tag</span>
            </div>
          }
        </ItemFieldWrapper>
      </div>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Description'
          image={GeneralImg.logo}
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

export default CampaignFields