import styles from './index.module.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import update from 'immutability-helper'
import { startOfMonth, endOfMonth, subDays, addDays } from 'date-fns'
import toastUtils from '../../../utils/toast'

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
    const startOfMonthDate = startOfMonth(subDays(startOfMonth(currentDate), 1))
    const endOfMonthDate = endOfMonth(addDays(endOfMonth(currentDate), 1))
    const filterObj = {
      startOfMonth: startOfMonthDate.toISOString(),
      endOfMonth: endOfMonthDate.toISOString()
    }

    return filterObj
  }

  const evalCampaignsWithFilters = (campaign) => {
    if (filters.campaign?.length > 0 && filters.campaign.findIndex(filterCampaign => campaign.id === filterCampaign.value) === -1) return false
    if (filters.status?.length > 0 && filters.status.findIndex(filterStatus => campaign.status === filterStatus.value) === -1) return false

    return true
  }

  const evalProjectsWithFilters = (project) => {
    if (filters.status?.length > 0 && filters.status.findIndex(filterStatus => project.status === filterStatus.value) === -1) return false
    if (filters.type?.length > 0 && filters.type.findIndex(filterType => project.type === filterType.value) === -1) return false
    if (filters.campaign?.length > 0 && filters.campaign.findIndex(filterCampaign => project.campaignId === filterCampaign.value) === -1) return false

    return true
  }

  const evalTasksWithFilters = (task) => {
    if (filters.status?.length > 0 && filters.status.findIndex(filterStatus => task.status === filterStatus.value) === -1) return false
    if (filters.campaign?.length > 0 && filters.campaign.findIndex(filterCampaign => task.project?.campaignId === filterCampaign.value) === -1) return false

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

  const updateItem = async (item, targetDate) => {
    try {
      const existingDate = new Date(item[getItemDateKey(item)])

      // Do nothing if moved to the same day and month
      if (existingDate.getDate() === targetDate.getDate() && existingDate.getMonth() === targetDate.getMonth()) return

      const newDate = new Date(targetDate.setHours(existingDate.getHours(), existingDate.getSeconds()))
      const itemIndex = mixedList.findIndex(searchedItem => searchedItem.id === item.id)

      let updatedIem
      // targetDate
      if (item.itemType === 'campaign') {
        setMixedList(update(mixedList,
          { [itemIndex]: { endDate: { $set: newDate } } }))
        await campaignApi.updateCampaign(item.id, { endDate: newDate })
      } else if (item.itemType === 'project') {
        setMixedList(update(mixedList,
          { [itemIndex]: { publishDate: { $set: newDate } } }))
        await projectApi.updateProject(item.id, { publishDate: newDate })
      } else {
        setMixedList(update(mixedList,
          { [itemIndex]: { endDate: { $set: newDate } } }))
        await taskApi.updateTask(item.id, { endDate: newDate })
      }



    } catch (err) {
      console.log(err)
      toastUtils.error('Could not change date')
    }
  }


  useEffect(() => {
    if (createVisible || searchVisible) {
      document.body.classList.add('no-overflow')
    } else {
      document.body.classList.remove('no-overflow')
    }
  }, [createVisible, searchVisible])

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
                  updateItem={updateItem}
                  setCurrentDate={setCurrentDate}
                  setActiveView={setActiveView}
                />
              </div>
            }
          </div>
          :
          <Month
            currentDate={currentDate}
            mixedList={mixedList}
            updateItem={updateItem}
            setCurrentDate={setCurrentDate}
            setActiveView={setActiveView}
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
