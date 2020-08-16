import styles from './member.module.css'
import { useState, useEffect } from 'react'

// Components

const Member = ({ email, role, name, profilePhoto }) => {

  return (
    <li className={styles.container}>
      <div className={styles['name-email']}>
        <div>{name}</div>
        <div>{email}</div>
      </div>
      <div>
        {role.name}
      </div>
    </li>
  )
}

export default Member
