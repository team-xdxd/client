import styles from './index.module.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'

// Components
import OverviewSubHeader from './overview-subheader'
import Banner from './banner'
import Upcoming from './upcoming'
import UpcomingTasks from './upcoming-tasks'
import CreateOverlay from '../create-overlay'

// name, status, date
const defTasks = [
  {
    name: 'New Fall',
    endDate: new Date(),
    status: 'draft'
  },
  {
    name: 'top Sellers',
    endDate: new Date(),
    status: 'completed'
  }
]


const Overview = () => {
  const [createVisible, setCreateVisible] = useState(false)
  const [createType, setCreateType] = useState('')

  const [campaigns, setCampaigns] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState(defTasks)

  const { user } = useContext(UserContext)

  const openCreateOVerlay = (type) => {
    setCreateVisible(true)
    setCreateType(type)
  }

  useEffect(() => {
    getCampaigns()
    getProjects()
  }, [])

  const getCampaigns = async () => {
    try {
      const { data } = await campaignApi.getCampaigns()
      setCampaigns(data)
    } catch (err) {
      // TODO: Display error or something
    }
  }

  const getProjects = async () => {
    try {
      const { data } = await projectApi.getProjects()
      setProjects(data)
    } catch (err) {
      // TODO: Display error or something
    }
  }

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
          {/* TODO: Add Chart in a future milestone */}
          <Upcoming
            type='campaign'
            items={campaigns}
            addOnClick={() => openCreateOVerlay('campaign')}
          />
          <Upcoming
            type='project'
            items={projects}
            addOnClick={() => openCreateOVerlay('project')}
          />
        </section>
        <section className={styles['second-section']}>
          <UpcomingTasks
            tasks={tasks}
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
