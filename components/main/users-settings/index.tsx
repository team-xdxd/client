import styles from './index.module.css'
import { useState, useEffect } from 'react'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import urlUtils from '../../../utils/url'
import { capitalCase } from 'change-case'

// Components
import SideNavigation from './side-navigation'
import Team from './team'
import Billing from './billing'

const SETTING_OPTIONS_CONTENT = {
  profile: () => <></>,
  billing: Billing,
  security: () => <></>,
  team: Team,
  notifications: () => <></>,
  integrations: () => <></>
}

const UserSettings = () => {

  useEffect(() => {
    const activeView = urlUtils.getPathId()
    setActiveView(activeView)
  }, [])

  const [activeView, setActiveView] = useState('')

  let ActiveContent = () => <></>
  if (SETTING_OPTIONS_CONTENT[activeView]) ActiveContent = SETTING_OPTIONS_CONTENT[activeView]

  return (
    <main className={`${styles.container}`}>
      <SideNavigation
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <section className={styles.content}>
        <h2>{capitalCase(activeView)}</h2>
        <ActiveContent />
      </section>
    </main>
  )
}

export default UserSettings
