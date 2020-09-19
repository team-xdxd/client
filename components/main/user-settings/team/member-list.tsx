import styles from './member-list.module.css'
import { useState, useEffect } from 'react'

// Components
import Member from './member'

const MemberList = ({ members, type = 'member', setSelectedMember, setSelectedDeleteMember }) => {

  const selectMember = (member) => {
    setSelectedMember({
      member,
      type
    })
  }

  const selectForDelete = (member) => {
    setSelectedDeleteMember({
      member,
      type
    })
  }

  return (
    <>
      <ul className={styles.container}>
        {members.map(member => (
          <Member
            key={member.id}
            id={member.id}
            email={member.email}
            name={member.name}
            profilePhoto={member.profilePhoto}
            role={member.role}
            type={type}
            editAction={() => selectMember(member)}
            deleteAction={() => selectForDelete(member)}
          />
        ))}
      </ul>
    </>
  )
}

export default MemberList
