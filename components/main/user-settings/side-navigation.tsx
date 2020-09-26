import styles from './side-navigation.module.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import Link from 'next/link'

// Components
const UserSettings = ({ activeView, SETTING_OPTIONS }) => {

  const { hasPermission } = useContext(UserContext)

  return (
    <section className={styles.container}>
      <ul>
        {Object.entries(SETTING_OPTIONS)
          .filter(([_, optionProps]) => hasPermission(optionProps.permissions))
          .map(([option, optionProps]) => (
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
