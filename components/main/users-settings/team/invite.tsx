import styles from './invite.module.css'
import { useState, useEffect } from 'react'

// Components

const Invite = ({ email, name, role }) => {

  return (
    <li className={styles.container}>
      <div>{email}</div>
      <div>
        {role.name}
      </div>
    </li>
  )
}

export default Invite
