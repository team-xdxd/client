import styles from './side-navigation.module.css'
import { useState, useEffect } from 'react'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import Link from 'next/link'

const SETTING_OPTIONS = {
  profile: { label: 'Profile' },
  company: { label: 'Company' },
  billing: { label: 'Billing' },
  plan: { label: 'Plan' },
  security: { label: 'Security' },
  team: { label: 'Team' },
  notifications: { label: 'Notifications' },
  integrations: { label: 'Integrations' }
}

// Components
const UserSettings = ({ activeView, setActiveView }) => {

  return (
    <section className={styles.container}>
      <ul>
        {Object.entries(SETTING_OPTIONS).map(([option, optionProps]) => (
          <Link href={`/main/user-settings/${option}`}>
            <a>
              <li className={`${styles.setting} ${activeView === option && styles.selected}`}>
                <span>{optionProps.label}</span>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </section>
  )
}

export default UserSettings
