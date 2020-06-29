import { useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'


// Components
import Search from '../../common/inputs/search'
import SearchItem from './search-item'

const CreateOverlay = ({ closeOverlay }) => {

  const [mixedList, setMixedList] = useState([])
  const [term, setTerm] = useState('')

  const getData = async (inputTerm) => {
    setTerm(inputTerm)
    try {
      const filterObj = { term: inputTerm }

      const campaignResponse = await campaignApi.getCampaigns(filterObj)
      const campaignsData = campaignResponse.data

      const projectResponse = await projectApi.getProjects(filterObj)
      const projectsData = projectResponse.data

      const taskResponse = await taskApi.getTasks(filterObj)
      const tasksData = taskResponse.data

      mixAndOrderData(campaignsData, projectsData, tasksData)

    } catch (err) {
      // TODO: Handle this error
      console.log(err)
    }
  }

  const mixAndOrderData = (campaignsData, projectsData, tasksData) => {
    const mixed = [
      ...campaignsData.map(campaign => ({ ...campaign, itemType: 'campaign' })),
      ...projectsData.map(project => ({ ...project, itemType: 'project' })),
      ...tasksData.map(task => ({ ...task, itemType: 'task' })),
    ]
    mixed
      .sort((itemA, itemB) => {
        const aDateKey = getItemDateKey(itemA)
        const bDateKey = getItemDateKey(itemB)

        // Handle undefined dates
        if (!itemA[aDateKey])
          return 1
        else if (!itemB[bDateKey])
          return -1

        const dateA = new Date(itemA[aDateKey])
        const dateB = new Date(itemB[bDateKey])

        if (dateA > dateB)
          return 1
        else if (dateA < dateB)
          return -1
        else
          return 0
      })
    setMixedList(mixed)
  }


  const getItemDateKey = (item) => {
    switch (item.itemType) {
      case 'campaign':
        return 'endDate'
      case 'project':
        return 'publishDate'
      case 'task':
        return 'endDate'
      default:
        return
    }
  }

  return (
    <div className={`app-overlay ${styles.container}`}>
      <div className={styles.top}>
        <div className={styles.close} onClick={closeOverlay}>
          <span className={styles.x}>X</span>
          <span>esc</span>
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.chooseTitle}>
          Search Calendar
        </h2>
        <div className={styles.search}>
          <Search
            onSubmit={(inputTerm) => getData(inputTerm)}
          />
        </div>
        <ul className={styles.list}>
          {mixedList.map((item, index) => (
            <SearchItem
              key={index}
              item={item}
              term={term}
            />
          ))}
        </ul>
      </div>
    </div >
  )
}

export default CreateOverlay
