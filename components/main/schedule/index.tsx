import styles from './index.module.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import update from 'immutability-helper'

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

  const openCreateOVerlay = (type) => {
    setCreateVisible(true)
    setCreateType(type)
  }

  const [activeView, setActiveView] = useState('month')

  return (
    <>
      <ScheduleSubHeader
        openCreateOVerlay={openCreateOVerlay}
      />
      <main className={`${styles.container}`}>
        <TopBar />
        <div className={styles.content}>
          {activeView === 'list' || activeView === 'week' &&
            <SidePanel />
          }
          {activeView === 'list' &&
            <List />
          }
          {activeView === 'week' &&
            <Week />
          }
          {activeView === 'month' &&
            <Month />
          }
        </div>
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
