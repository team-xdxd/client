import styles from './index.module.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import update from 'immutability-helper'
import { startOfDay } from 'date-fns'

// Components
import OverviewSubHeader from './overview-subheader'
import Banner from './banner'
import SchedulingReport from './scheduling-report'
import Upcoming from './upcoming'
import UpcomingTasks from './upcoming-tasks'
import CreateOverlay from '../create-overlay'

// name, status, date

const Overview = () => {
  const [createVisible, setCreateVisible] = useState(false)
  const [createType, setCreateType] = useState('')

  const [campaigns, setCampaigns] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const { user } = useContext(UserContext)

  const DEFAULT_DATE = startOfDay(new Date()).toISOString()

  const openCreateOVerlay = (type) => {
    setCreateVisible(true)
    setCreateType(type)
  }

  useEffect(() => {
    getCampaigns()
    getProjects()
    getTasks()
  }, [])

  const deleteCampaign = async (index) => {
    try {
      await campaignApi.deleteCampaign(campaigns[index].id)
      setCampaigns(update(campaigns, { $splice: [[index, 1]] }))
    } catch (err) {
      // TODO: Handle error
    }
  }

  const deleteProject = async (index) => {
    try {
      await projectApi.deleteProject(projects[index].id)
      setProjects(update(projects, { $splice: [[index, 1]] }))
    } catch (err) {
      // TODO: Handle error
    }
  }

  const getCampaigns = async () => {
    try {
      const { data } = await campaignApi.getCampaigns({ fromDate: DEFAULT_DATE })
      setCampaigns(data)
    } catch (err) {
      // TODO: Display error or something
    }
  }

  const getProjects = async () => {
    try {
      const { data } = await projectApi.getProjects({ fromDate: DEFAULT_DATE })
      setProjects(data)
    } catch (err) {
      // TODO: Display error or something
    }
  }

  const getTasks = async () => {
    try {
      const { data } = await taskApi.getTasks({ fromDate: DEFAULT_DATE })
      setTasks(data)
    } catch (err) {
      // TODO: Display error or something
    }
  }

  useEffect(() => {
    if (createVisible) {
      document.body.classList.add('no-overflow')
    } else {
      document.body.classList.remove('no-overflow')
    }
  }, [createVisible])

  return (
    <>
      <OverviewSubHeader
        openCreateOVerlay={openCreateOVerlay}
      />
      <main className={`${styles.container}`}>
        <section className={styles['first-section']}>
          <Banner
            userName={user?.name}
          />
          <SchedulingReport />
          <Upcoming
            type='project'
            items={projects.slice(0, 5)}
            addOnClick={() => openCreateOVerlay('project')}
            deleteItem={deleteProject}
          />
          <Upcoming
            type='campaign'
            items={campaigns.slice(0, 5)}
            addOnClick={() => openCreateOVerlay('campaign')}
            deleteItem={deleteCampaign}
          />
        </section>
        <section className={styles['second-section']}>
          <UpcomingTasks
            tasks={tasks.slice(0, 5)}
          />
          {/* TODO: Add help section in a future milestone */}
        </section>
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

export default Overview
