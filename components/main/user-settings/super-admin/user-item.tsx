import styles from './user-item.module.css'
import { useState } from 'react'

// Components
import Button from '../../../common/buttons/button'

const UserItem = ({ user, getUserToken }) => {
  return (
    <div className={styles.container}>
      <div className={styles['name-email']}>
        <div>
          {user.name}
        </div>
        <div>
          {user.email}
        </div>
      </div>
      <div className={styles.role}>
        {user.roleId}
      </div>
      <div className={styles.company}>
        <div className={!user.team.company && styles['no-comp']}>
          {user.team.company || 'No company name'}
        </div>
        <div>
          {user.team.plan.name}
        </div>
      </div>
      <Button onClick={getUserToken} type={'button'} styleType={'secondary'} text={'User login'} />
    </div>
  )
}

export default UserItem