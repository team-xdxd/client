import styles from './member-list.module.css'
import { useState, useEffect } from 'react'

// Components
import Member from './member'

const MemberList = ({ members }) => {

  return (
    <>
      <ul className={styles.container}>
        {members.map(member => (
          <Member
            key={member.id}
            email={member.email}
            name={member.name}
            profilePhoto={member.profilePhoto}
            role={member.role}
          />
        ))}
      </ul>
    </>
  )
}

export default MemberList
