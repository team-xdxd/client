import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'
import update from 'immutability-helper'
import campaignApi from '../../../../server-api/campaign'
import toastUtils from '../../../../utils/toast'

// Components
import ItemSubheader from '../../../common/item-subheader'
import ItemSublayout from '../../../common/item-sublayout'
import Fields from './campaign-fields'
import { set } from 'date-fns'

const CampaignDetail = () => {

  const [campaign, setCampaign] = useState()

  const [collaborators, setCollaborators] = useState([])
  const [description, setDescription] = useState('')
  const [endDate, setEndDate] = useState(new Date())
  const [owner, setOwner] = useState()
  const [tags, setTags] = useState([])

  useEffect(() => {
    getCampaign()
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

  const saveCampaign = async () => {
    try {
      const saveDate = {
        description,
        endDate
      }
      await campaignApi.updateCampaign(campaign.id, saveDate)
      toastUtils.success('Campaign saved sucesfully')
    } catch (err) {
      // TODO: Error handling
    }
  }

  const setCampaignData = (data) => {
    // TODO: get the correct owner
    setOwner(data.users[0])
    setCollaborators(data.users)
    setDescription(data.description)
    setEndDate(data.endDate)
    setTags(data.tags)
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

  return (
    <>
      <ItemSubheader
        title={campaign?.name}
        saveDraft={saveCampaign}
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

export default CampaignDetail
