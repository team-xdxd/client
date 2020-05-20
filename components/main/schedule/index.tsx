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
import SearchOverlay from '../search-overlay'
import SidePanel from './side-panel'
import TopBar from './top-bar'
import List from './list'
import Week from './week'
import Month from './month'

const Schedule = () => {
  const [createVisible, setCreateVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

  const [createType, setCreateType] = useState('')

  const [campaigns, setCampaigns] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const [mixedList, setMixedList] = useState([])

  const [currentDate, setCurrentDate] = useState(new Date())

  const [allCampaigns, setAllCampaigns] = useState([])

  const [initialLoaded, setInitialLoaded] = useState(false)

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
    setInitialLoaded(true)
  }, [currentDate])

  useEffect(() => {
    if (initialLoaded)
      applyLightFiltersAndOrder()
  }, [filters])

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
    try {

      const campaignResponse = await campaignApi.getCampaigns(commonFilters)
      const campaignsData = campaignResponse.data
      setCampaigns(campaignsData)

      const projectResponse = await projectApi.getProjects(commonFilters)
      const projectsData = projectResponse.data
      setProjects(projectsData)

      const taskResponse = await taskApi.getTasks(commonFilters)
      const tasksData = taskResponse.data
      setTasks(tasksData)

      applyLightFiltersAndOrder(campaignsData, projectsData, tasksData)

    } catch (err) {
      // TODO: Handle this error
      console.log(err)
    }
  }

  const applyLightFiltersAndOrder = (campaignsData = campaigns, projectsData = projects, tasksData = tasks) => {
    const typeFilter = filters.type?.value

    let filteredCampaigns = []
    if (!typeFilter || typeFilter === 'campaigns') {
      filteredCampaigns = campaignsData.filter(evalCampaignsWithFilters)
    }

    let filteredProjects = []
    if (!typeFilter || (typeFilter !== 'campaigns' && typeFilter !== 'tasks')) {
      filteredProjects = projectsData.filter(evalProjectsWithFilters)
    }

    let filteredTasks = []
    if (!typeFilter || typeFilter === 'tasks') {
      filteredTasks = tasksData.filter(evalTasksWithFilters)
    }

    mixAndOrderData(filteredCampaigns, filteredProjects, filteredTasks)
  }

  const mixAndOrderData = (campaignsData, projectsData, tasksData) => {
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

    return filterObj
  }

  const evalCampaignsWithFilters = (campaign) => {
    if (filters.campaign && campaign.id !== filters.campaign.value) return false
    if (filters.status && campaign.status !== filters.status.value) return false

    return true
  }

  const evalProjectsWithFilters = (project) => {
    if (filters.status && project.status !== filters.status.value) return false
    if (filters.type && project.type !== filters.type.value) return false
    if (filters.campaign && project.campaignId !== filters.campaign.value) return false

    return true
  }

  const evalTasksWithFilters = (task) => {
    if (filters.status && task.status !== filters.status.value) return false
    if (filters.campaign && task.project?.campaignId !== filters.campaign.value) return false

    return true
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

  useEffect(() => {
    if (createVisible || searchVisible) {
      document.body.classList.add('no-overflow')
    } else {
      document.body.classList.remove('no-overflow')
    }
  }, [createVisible, searchVisible])

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
          setSearchVisible={setSearchVisible}
        />
        {activeView !== 'month' ?
          <div className={styles.content}>
            <div className={styles['side-panel']}>
              <SidePanel
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                filters={filters}
                setFilters={setFilters}
                activeView={activeView}
              />
            </div>
            {activeView === 'list' &&
              <div className={styles.schedule}>
                <List
                  mixedList={mixedList}
                  currentDate={currentDate}
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
      {searchVisible &&
        <SearchOverlay
          closeOverlay={() => setSearchVisible(false)}
        />
      }

    </>
  )
}

export default Schedule
