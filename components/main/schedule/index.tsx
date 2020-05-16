import styles from './index.module.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import update from 'immutability-helper'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import queryString from 'querystring'
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

  const [allCampaigns, setAllCampaigns] = useState([])

  // Filters
  const [filters, setFilters] = useState({
    campaign: null,
    status: null,
    type: null,
    owner: null
  })

  useEffect(() => {
    getAllCampaigns()
  }, [])

  useEffect(() => {
    getData()
  }, [currentDate, filters])

  const getAllCampaigns = async () => {
    try {
      const { data } = await campaignApi.getCampaigns()
      setAllCampaigns(data)
    } catch (err) {
      // TODO: Handle this error
      console.log(err)
    }
  }

  const getData = async () => {
    const commonFilters = getCommonFilters()
    const campaignFilters = getCampaignFilters()
    const projectFilters = getProjectFilters()
    const taskFilters = getTaskFilters()

    const typeFilter = filters.type?.value

    try {

      let campaignsData = []
      if (!typeFilter || typeFilter === 'campaigns') {
        const campaignResponse = await campaignApi.getCampaigns()
        campaignsData = campaignResponse.data
        setCampaigns(campaignsData)
      }

      let projectsData = []
      if (!typeFilter || (typeFilter !== 'campaigns' && typeFilter !== 'tasks')) {
        const projectResponse = await projectApi.getProjects({ ...commonFilters, ...projectFilters })
        projectsData = projectResponse.data
        setProjects(projectsData)
      }

      let tasksData = []
      if (!typeFilter || typeFilter === 'tasks') {
        const taskResponse = await taskApi.getTasks()
        tasksData = taskResponse.data
        setTasks(tasksData)
      }

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

  const getCommonFilters = () => {
    const startOfMonthDate = startOfMonth(currentDate)
    const endOfMonthDate = endOfMonth(currentDate)
    const filterObj = {
      startOfMonth: startOfMonthDate.toISOString(),
      endOfMonth: endOfMonthDate.toISOString()
    }
    if (filters.status)
      filterObj.status = filters.status.value

    if (filters.campaign)
      filterObj.campaignId = filters.campaign.value

    return filterObj
  }

  const getCampaignFilters = () => {
    // No filters specific to campaign yet
    const filterObj = {}
    return filterObj
  }

  const getProjectFilters = () => {
    const filterObj = {}
    if (filters.type)
      filterObj.type = filters.type.value

    return filterObj
  }

  const getTaskFilters = () => {
    // No filters specific to task yet
    const filterObj = {}
    return filterObj
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

  const [activeView, setActiveView] = useState('week')

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
          setCurrentDate={setCurrentDate}
          filters={filters}
          setFilters={setFilters}
          allCampaigns={allCampaigns}
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
                <Week
                  currentDate={currentDate}
                  mixedList={mixedList}
                />
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
