import styles from './index.module.css'
import { useState, useEffect, useContext } from 'react'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import urlUtils from '../../../utils/url'
import { UserContext } from '../../../context'
import { capitalCase } from 'change-case'
import LocationContextProvider from '../../../context/location-provider'

// Components
import SideNavigation from './side-navigation'
import Profile from './profile'
import Team from './team'
import Company from './company'
import Billing from './billing'
import Plan from './plan'
import Security from './security'
import Integrations from './integrations'
import Notifications from './notifications'
import NoPermissionNotice from '../../common/misc/no-permission-notice'

import {
  SETTINGS_BILLING,
  SETTINGS_SECURITY,
  SETTINGS_TEAM,
  SETTINGS_COMPANY,
  SETTINGS_PLAN
} from '../../../constants/permissions'

const SETTING_OPTIONS = {
  profile: { label: 'Profile', permissions: [], content: Profile },
  billing: { label: 'Billing', permissions: [SETTINGS_BILLING], content: Billing },
  company: { label: 'Company', permissions: [SETTINGS_COMPANY], content: Company },
  plan: { label: 'Plan', permissions: [SETTINGS_PLAN], content: Plan },
  security: { label: 'Security', permissions: [SETTINGS_SECURITY], content: Security },
  team: { label: 'Team', permissions: [SETTINGS_TEAM], content: Team },
  notifications: { label: 'Notifications', permissions: [], content: Notifications },
  integrations: { label: 'Integrations', permissions: [], content: Integrations },
}

const UserSettings = () => {

  const { hasPermission } = useContext(UserContext)

  useEffect(() => {
    const activeView = urlUtils.getPathId()
    setActiveView(activeView)
  }, [])

  const [activeView, setActiveView] = useState('')

  let ActiveContent = () => <></>
  if (SETTING_OPTIONS[activeView]) ActiveContent = SETTING_OPTIONS[activeView].content

  return (
    <main className={`${styles.container}`}>
      <LocationContextProvider>
        <SideNavigation
          activeView={activeView}
          SETTING_OPTIONS={SETTING_OPTIONS}
        />
        <section className={styles.content}>
          <h2>{capitalCase(activeView)}</h2>
          {hasPermission(SETTING_OPTIONS[activeView]?.permissions) ?
            <ActiveContent />
            :
            <NoPermissionNotice />
          }
        </section>
      </LocationContextProvider>
    </main>
  )
}

export default UserSettings
