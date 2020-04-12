import { useState, useEffect } from 'react'

import styles from './index.module.css'
import Link from 'next/link'

// Components
import ItemSubheader from '../../../common/item-subheader'
import ItemSublayout from '../../../common/item-sublayout'
import Fields from './campaign-fields'

const CampaignDetail = () => {

  const [campaign, setCampaign] = useState({

  })

  const [collaborators] = useState([])
  const [description, setDescription] = useState('')
  const [endDate, setEndDate] = useState(new Date())
  const [owner] = useState()
  const [tags, setTags] = useState([])

  return (
    <>
      <ItemSubheader
        title={'Campaign name'}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout >
          <Fields
            collaborators={collaborators}
            description={description}
            setDescription={setDescription}
            endDate={endDate}
            setEndDate={setEndDate}
            owner={owner}
            tags={tags}
            setTags={setTags}
          />
        </ItemSublayout>
      </main>
    </>
  )
}

export default CampaignDetail
