import styles from './index.module.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import update from 'immutability-helper'
import { format } from 'date-fns'

// Components
import ScheduleSubHeader from './schedule-subheader'
import CreateOverlay from '../create-overlay'
import SidePanel from './side-panel'
import TopBar from './top-bar'
import List from './list'
import Week from './week'
import Month from './month'

const Schedule = () => {
  const [createVisible, setCreateVisible] = useState(false)
  const [createType, setCreateType] = useState('')

  const [campaigns, setCampaigns] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const [mixedList, setMixedList] = useState([])

  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const campaignResponse = await campaignApi.getCampaigns()
      const campaignsData = campaignResponse.data
      setCampaigns(campaignsData)

      const projectResponse = await projectApi.getProjects()
      const projectsData = projectResponse.data
      setProjects(projectsData)

      const taskResponse = await taskApi.getTasks()
      const tasksData = taskResponse.data
      setTasks(tasksData)

      mixAndOrderData(campaignsData, projectsData, tasksData)

    } catch (err) {
      // TODO: Handle this error
      console.log(err)
    }
  }

  const mixAndOrderData = (campaignsData = campaigns, projectsData = projects, tasksData = tasks) => {
    const mixed = [
      ...campaignsData.map(campaign => ({ ...campaign, itemType: 'campaign' })),
      ...projectsData.map(project => ({ ...project, itemType: 'project' })),
      ...tasksData.map(task => ({ ...task, itemType: 'task' })),
    ]
    mixed
      .filter(item => (new Date(item[getItemDateKey(item)]).getMonth()) === currentDate.getMonth()
        || (new Date(item.startDate).getMonth()) === currentDate.getMonth()
      )
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

  const openCreateOVerlay = (type) => {
    setCreateVisible(true)
    setCreateType(type)
  }

  const [activeView, setActiveView] = useState('month')

  return (
    <>
      <ScheduleSubHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        openCreateOVerlay={openCreateOVerlay}
      />
      <main className={`${styles.container}`}>
        <TopBar
          activeView={activeView}
          setActiveView={setActiveView}
        />
        {activeView !== 'month' ?
          <div className={styles.content}>
            <div className={styles['side-panel']}>
              <SidePanel />
            </div>
            {activeView === 'list' &&
              <div className={styles.schedule}>
                <List
                  mixedList={mixedList}
                />
              </div>
            }
            {activeView === 'week' &&
              <div className={styles.schedule}>
                <Week />
              </div>
            }
          </div>
          :
          <Month
            currentDate={currentDate}
            mixedList={mixedList}
          />
        }
      </main>
      {createVisible &&
        <CreateOverlay
          type={createType}
          setType={setCreateType}
          closeOverlay={() => setCreateVisible(false)}
        />
      }
    </>
  )
}

export default Schedule
