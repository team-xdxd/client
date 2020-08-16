import styles from './invite-list.module.css'
import { useState, useEffect } from 'react'

// Components
import Invite from './invite'

const InviteList = ({ invites }) => {

  return (
    <>
      <ul className={styles.container}>
        {invites.map(member => (
          <Invite
            key={member.id}
            email={member.email}
            name={member.name}
            role={member.role}
          />
        ))}
      </ul>
    </>
  )
}

export default InviteList
