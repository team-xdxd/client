import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import styles from './project-fields.module.css'
import { ItemFields, Utilities, ProjectTypeChannel, ProjectTypes } from '../../../../assets'
import DayPicker from 'react-day-picker'
import TimePicker from 'react-time-picker/dist/entry.nostyle'
import { format } from 'date-fns'
import update from 'immutability-helper'
import tagApi from '../../../../server-api/tag'
import campaignApi from '../../../../server-api/campaign'
import { capitalCase } from 'change-case'

import channelSocialOptions from '../../../../resources/data/channels-social.json'
import channelAdsOptions from '../../../../resources/data/channels-ads.json'

// Components
import ItemFieldWrapper from '../../../common/items/item-field-wrapper'
import ToggleableAbsoluteWrapper from '../../../common/misc/toggleable-absolute-wrapper'
import Select from '../../../common/inputs/select'
import Dropdown from '../../../common/inputs/dropdown'
import Tag from '../../../common/misc/tag'

const ProjectFields = ({
  editableFields: {
    owner,
    startDate,
    publishDate,
    campaign,
    collaborators,
    description,
    subject,
    tags,
    channel,
    headline,
    preheader
  },
  addTag,
  removeTag,
  editFields,
  project
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
  const handleStartDayClick = (day, { selected }) => {
    editFields('startDate', selected ? undefined : day)
    setActiveInput('')
  }

  const handlePublishDayClick = (day, { selected }) => {
    editFields('publishDate', selected ? undefined : day)
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
    editFields('campaign', selected)
    toggleActiveInput('campaign')
  }

  const handleChannelChange = (selected) => {
    editFields('channel', selected.value)
    toggleActiveInput('channel')
  }

  return (
    <div className='item-detail-cont'>
      <div className={'field'}>
        <ItemFieldWrapper
          title='Owner'
          image={ItemFields.member}
        >
          <span>{owner?.name}</span>
        </ItemFieldWrapper>
      </div>
      {(project.type === 'ads' || project.type === 'banners') &&
        <ToggleableAbsoluteWrapper
          closeOnAction={false}
          wrapperClass='field'
          Wrapper={({ children }) => (
            <>
              <ItemFieldWrapper
                title='Start Date'
                image={ItemFields.date}
                hasOption={true}
                optionOnClick={() => toggleActiveInput('startDate')}
              >
                <span>{startDate ? format(new Date(startDate), 'MMM d, yyyy') : 'No Start Date'}</span>
              </ItemFieldWrapper>
              {children}
            </>
          )}
          contentClass='day-picker'
          Content={() => (
            <DayPicker
              selectedDays={new Date(startDate)}
              disabledDays={
                {
                  after: publishDate && new Date(publishDate),
                }
              }
              onDayClick={handleStartDayClick} />
          )}
        />
      }
      <ToggleableAbsoluteWrapper
        closeOnAction={false}
        wrapperClass='field'
        Wrapper={({ children }) => (
          <>
            <ItemFieldWrapper
              title='Deadline Date'
              image={ItemFields.date}
              hasOption={true}
              optionOnClick={() => toggleActiveInput('publishDate')}
            >
              <span>{publishDate ? format(new Date(publishDate), 'MMM d, yyyy') : 'No Deadline Date'}</span>
            </ItemFieldWrapper>
            {children}
          </>
        )}
        contentClass='day-picker'
        Content={() => (
          <DayPicker
            selectedDays={publishDate}
            disabledDays={
              {
                before: startDate && new Date(startDate),
              }
            }
            onDayClick={handlePublishDayClick} />
        )}
      />
      {(project.type !== 'ads' && project.type !== 'banners') &&
        <div className={`field`}>
          <ItemFieldWrapper
            title='Time'
            image={Utilities.time}
            optionOnClick={() => toggleActiveInput('time')}
          >
            {publishDate ?
              <div>
                <TimePicker
                  disableClock={true}
                  className='detail-time'
                  onChange={(date) => {
                    const splitInput = date.split(':')
                    let currentDate = new Date(publishDate)
                    currentDate = new Date(currentDate.setHours(splitInput[0], splitInput[1]))
                    editFields('publishDate', currentDate)
                  }}
                  value={format(new Date(publishDate), 'HH:mm')}
                />
              </div>
              :
              <span>No Deadline Date</span>
            }
          </ItemFieldWrapper>
        </div>
      }
      {project.type === 'email' &&
        <>
          <div className={`field`}>
            <ItemFieldWrapper
              title='Subject'
              image={ItemFields.description}
            >
              <textarea
                rows={subject?.length > 0 ? Math.ceil(subject.length / 25) : 1}
                value={subject}
                onChange={(e) => editFields('subject', e.target.value)}
                placeholder='Enter Subject'
                onClick={() => toggleActiveInput('subject')}
                onBlur={() => toggleActiveInput('subject')}
              />
            </ItemFieldWrapper>
          </div>
          <div className={`field`}>
            <ItemFieldWrapper
              title='Preheader'
              image={ItemFields.description}
            >
              <textarea
                rows={preheader?.length > 0 ? Math.ceil(preheader.length / 25) : 1}
                value={preheader}
                onChange={(e) => editFields('preheader', e.target.value)}
                placeholder='Enter Preheader'
                onClick={() => toggleActiveInput('preheader')}
                onBlur={() => toggleActiveInput('preheader')}
              />
            </ItemFieldWrapper>
          </div>
        </>
      }
      {project.type === 'articles' &&
        <div className={`field`}>
          <ItemFieldWrapper
            title='Headline'
            image={ItemFields.description}
          >
            <textarea
              rows={headline?.length > 0 ? Math.ceil(headline.length / 25) : 1}
              value={headline}
              onChange={(e) => editFields('headline', e.target.value)}
              placeholder='Enter Headline'
              onClick={() => toggleActiveInput('headline')}
              onBlur={() => toggleActiveInput('headline')}
            />
          </ItemFieldWrapper>
        </div>
      }
      {(project.type === 'social' || project.type === 'ads') &&
        <div className={'field'}>
          <ItemFieldWrapper
            title='Social Channel'
            image={channel && ProjectTypeChannel[channel] ? ProjectTypeChannel[channel] : ProjectTypeChannel.social}
            hasOption={true}
            optionOnClick={() => toggleActiveInput('channel')}
          >
            <span>{channel && capitalCase(channel)}</span>
            {activeInput === 'channel' &&
              <div className={'dropdown'}>
                <Dropdown
                  options={project.type === 'social' ?
                    channelSocialOptions.map(option => ({ label: capitalCase(option), value: option }))
                    :
                    channelAdsOptions.map(option => ({ label: capitalCase(option), value: option }))
                  }
                  onClick={handleChannelChange}
                />
              </div>
            }
          </ItemFieldWrapper>
        </div>
      }
      {/* TODO: Create input for this thing */}
      {/* <div className={`field`}>
        <ItemFieldWrapper
          title='Time'
          image={Utilities.time}
        >
          <span>{''}</span>
        </ItemFieldWrapper>
      </div> */}
      <div className='field'>
        <ItemFieldWrapper
          title='Campaign'
          image={ProjectTypes.campaign}
        >
          <span>{campaign?.name}</span>
          {activeInput === 'campaign' ?
            <div className={'tag-select'}>
              <Select
                options={inputCampaigns.map(campaign => ({ ...campaign, label: campaign.name, value: campaign.id }))}
                placeholder={'Select a campaign'}
                value={campaign ? { label: campaign.name, value: campaign.id } : null}
                onChange={handleCampaignChange}
                styleType={'regular item'}
              />
            </div>
            :
            <div className={'add'} onClick={() => toggleActiveInput('campaign')}>
              <img src={Utilities.add} />
              <span>Add to a Campaign</span>
            </div>
          }
        </ItemFieldWrapper>
      </div>
      <div className={`field`}>
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
                placeholder={'Enter a new tag or select an existing one'}
                options={inputTags.map(tag => ({ label: tag.name, value: tag.id }))}
                className={`regular item`}
                onChange={handleTagChange}
                classNamePrefix='select-prefix'
              />
            </div>
            :
            <div className={'add'} onClick={() => toggleActiveInput('tags')}>
              <img src={Utilities.add} />
              <span>Add Tag</span>
            </div>
          }
        </ItemFieldWrapper>
      </div>
      <div onClick={() => toggleActiveInput('collaborators')} className={'field'}>
        <ItemFieldWrapper
          title='Collaborators'
          image={ItemFields.member}
        >
          {/* TODO: Add images of collaborators when teams are implemented */}
          <div className={'add'}>
            <img src={Utilities.add} />
            <span>Add Collaborator</span>
          </div>
        </ItemFieldWrapper>
      </div>
      <div className={`field pad-div`}></div>
      <div className={`field field-wide`}>
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

export default ProjectFields