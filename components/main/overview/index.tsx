import styles from './index.module.css'
import Link from 'next/link'
import { useState } from 'react'

// Components
import OverviewSubHeader from './overview-subheader'
import Banner from './banner'
import Upcoming from './upcoming'
import UpcomingTasks from './upcoming-tasks'
import CreateOverlay from '../create-overlay'

const campaigns = [
  {
    name: 'New Fall',
    endDate: new Date(),
    users: [
      {
        name: 'Diana Prince'
      }
    ],
    status: 'draft'
  },
  {
    name: 'top Sellers',
    endDate: new Date(),
    users: [
      {
        name: 'Spencer Moss'
      }
    ],
    status: 'completed'
  }
]

const projects = [
  {
    name: 'New Fall',
    publishDate: new Date(),
    users: [
      {
        name: 'Diana Prince'
      }
    ],
    status: 'draft'
  },
  {
    name: 'top Sellers',
    publishDate: new Date(),
    users: [
      {
        name: 'Spencer Moss'
      }
    ],
    status: 'completed'
  }
]

// name, status, date
const tasks = [
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

  const openCreateOVerlay = (type) => {
    setCreateVisible(true)
    setCreateType(type)
  }

  return (
    <>
      <OverviewSubHeader
        openCreateOVerlay={openCreateOVerlay}
      />
      <main className={`${styles.container}`}>
        <section className={styles['first-section']}>
          <Banner />
          {/* TODO: Add Chart in a future milestone */}
          <Upcoming
            type='campaign'
            items={campaigns}
          />
          <Upcoming
            type='project'
            items={projects}
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
