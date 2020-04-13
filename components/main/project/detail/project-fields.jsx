import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import styles from './project-fields.module.css'
import { ItemFields, Utilities, ProjectTypeChannel, ProjectType } from '../../../../assets'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'
import update from 'immutability-helper'
import tagApi from '../../../../server-api/tag'
import campaignApi from '../../../../server-api/campaign'
import { capitalCase } from 'change-case'

// Components
import ItemFieldWrapper from '../../../common/item-field-wrapper'
import Select from '../../../common/select'

const ProjectFields = ({
  owner,
  publishDate,
  setPublishDate,
  campaign,
  setCampaign,
  type,
  setType,
  collaborators,
  setCollaborators,
  description,
  setDescription,
  addTag,
  tags
}) => {

  const [activeInput, setActiveInput] = useState('')

  const [inputTags, setInputTags] = useState([])
  const [inputCampaigns, setInputCampaigns] = useState([])

  useEffect(() => {
    getTags()
    getCampaigns()
  }, [])

  const getTags = async () => {
    try {
      const { data } = await tagApi.getTags()
      setInputTags(data)
    } catch (err) {
      // TODO: Maybe show error?
    }
  }

  const getCampaigns = async () => {
    try {
      const { data } = await campaignApi.getCampaigns()
      setInputCampaigns(data)
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
    setPublishDate(selected ? undefined : day)
    setActiveInput('')
  }

  const handleTagChange = async (selected, actionMeta) => {
    const newTag = await addTag(selected, actionMeta.action === 'create-option')
    if (actionMeta.action === 'create-option') {
      setInputTags(update(inputTags, { $push: [newTag] }))
    }
    toggleActiveInput('tags')
  }

  const handleCampaignChange = (selected) => {
    setCampaign(selected)
    toggleActiveInput('campaign')
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Owner'
          image={ItemFields.member}
        >
          <span>{owner?.name}</span>
        </ItemFieldWrapper>
      </div>
      <div className={`${styles.field} ${styles['field-row-last']}`}>
        <ItemFieldWrapper
          title='End Date'
          image={ItemFields.date}
          hasOption={true}
          optionOnClick={() => toggleActiveInput('endDate')}
        >
          <span>{publishDate ? format(new Date(publishDate), 'MMM d, yyyy') : 'No End Date'}</span>
        </ItemFieldWrapper>
        {activeInput === 'endDate' &&
          <div className={styles['day-picker']}>
            <DayPicker
              selectedDays={publishDate}
              onDayClick={handleDayClick} />
          </div>
        }
      </div>
      <hr />
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Social Channel'
          image={ProjectTypeChannel.social}
        >
          <span>{capitalCase('Facebook')}</span>
        </ItemFieldWrapper>
      </div>
      <div className={`${styles.field} ${styles['field-row-last']}`}>
        <ItemFieldWrapper
          title='Time'
          image={Utilities.time}
        >
          <span>{''}</span>
        </ItemFieldWrapper>
      </div>
      <hr />
      <div className={styles.field}>
        <ItemFieldWrapper
          title='Campaign'
          image={ProjectType.campaign}
        >
          <span>{campaign?.name}</span>
          {activeInput === 'campaign' ?
            <div className={styles['tag-select']}>
              <Select
                options={inputCampaigns.map(campaign => ({ ...campaign, label: campaign.name, value: campaign.id }))}
                placeholder={'Select a campaign'}
                value={campaign ? { label: campaign.name, value: campaign.id } : null}
                onChange={handleCampaignChange}
                styleType={'regular item'}
              />
            </div>
            :
            <div className={styles.add} onClick={() => toggleActiveInput('campaign')}>
              <img src={Utilities.add} />
              <span>Add to a Campaign</span>
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
      <div onClick={() => toggleActiveInput('collaborators')} className={styles.field}>
        <ItemFieldWrapper
          title='Collaborators'
          image={ItemFields.member}
        >
          {/* TODO: Add images of collaborators when teams are implemented */}
          <div className={styles.add}>
            <img src={Utilities.add} />
            <span>Add Collaborator</span>
          </div>
        </ItemFieldWrapper>
      </div>
      <div className={`${styles.field} ${styles['field-row-last']}`}></div>
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

export default ProjectFields