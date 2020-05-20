import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'
import campaignApi from '../../../../server-api/campaign'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/items/item-subheader'
import ItemSublayout from '../../../common/layouts/item-sublayout'
import Fields from './campaign-fields'
import { set } from 'date-fns'

const CampaignDetail = () => {

  const [campaign, setCampaign] = useState()

  const [campaignNames, setCampaignNames] = useState([])

  const [name, setName] = useState([])
  const [collaborators, setCollaborators] = useState([])
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [owner, setOwner] = useState()
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    getCampaign()
    getCampaignNames()
  }, [])

  const getCampaign = async () => {
    try {
      const splitPath = window.location.pathname.split('/')
      const { data } = await campaignApi.getCampaignById(splitPath[splitPath.length - 1])
      setCampaignData(data)
      setCampaign(data)
    } catch (err) {
      // TODO: Error handling
    }
  }

  const getCampaignNames = async () => {
    try {
      const { data } = await campaignApi.getCampaigns()
      setCampaignNames(data.map(campaign => campaign.name))
    } catch (err) {
      // TODO: Error handling
    }
  }

  const saveCampaign = async () => {
    if (!name) {
      return toastUtils.error('The name cannot be empty')
    }
    if (name !== campaign.name && campaignNames.includes(name)) {
      return toastUtils.error('A campaign with that name already exists')
    }
    try {
      const saveData = {
        description,
        endDate,
        startDate,
        name
      }
      const { data } = await campaignApi.updateCampaign(campaign.id, saveData)
      getCampaignNames()
      setCampaign(data)
      toastUtils.success('Campaign saved sucesfully')
    } catch (err) {
      // TODO: Error handling
    }
  }

  const setCampaignData = (data) => {
    // TODO: get the correct owner
    setName(data.name)
    setOwner(data.users[0])
    setCollaborators(data.users)
    setDescription(data.description)
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setTags(data.tags)
    setStatus(data.status)
  }

  const addTag = async (tag, isNew = false) => {
    if (tags.findIndex(campaignTag => tag.label === campaignTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await campaignApi.addTag(campaign.id, newTag)
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

  const removeTag = async (index) => {
    try {
      setTags(update(tags, { $splice: [[index, 1]] }))
      await campaignApi.removeTag(campaign.id, tags[index].id)
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  const changeStatus = async (newStatus) => {
    try{
      setStatus(newStatus)
      await campaignApi.updateCampaign(campaign.id, {status: newStatus})
      toastUtils.success('Campaign updated sucesfully')
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  return (
    <>
      <ItemSubheader
        title={name}
        saveDraft={saveCampaign}
        status={status}
        changeStatus={changeStatus}
        changeName={(name) => setName(name)}
        resetPageTittle={() => setName(campaign?.name)}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout >
          {campaign &&
            <Fields
              collaborators={collaborators}
              description={description}
              setDescription={setDescription}
              endDate={endDate}
              setEndDate={setEndDate}
              startDate={startDate}
              setStartDate={setStartDate}
              owner={owner}
              tags={tags}
              setTags={setTags}
              setCollaborators={setCollaborators}
              addTag={addTag}
              removeTag={removeTag}
            />
          }
        </ItemSublayout>
      </main>
    </>
  )
}

export default CampaignDetail
