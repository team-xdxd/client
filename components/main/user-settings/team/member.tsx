import styles from './member.module.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../../context'
import { capitalCase } from 'change-case'

// Components

const Member = ({ id, email, role, name, profilePhoto, type, editAction, deleteAction }) => {
  const { user } = useContext(UserContext)
  return (
    <li className={styles.container}>
      <div className={styles['name-email']}>
        {type === 'member' && <div>{name}</div>}
        <div>{email}</div>
      </div>
      <div className={styles.details}>
        <div className={styles.role}>{capitalCase(role.name)}</div>
        {user.id !== id &&
          <>
            <div onClick={editAction}
              className={styles.action}>
              edit
            </div>
            <div onClick={deleteAction}
              className={styles.action}>
              delete
            </div>
          </>
        }
      </div>
    </li>
  )
}

export default Member
