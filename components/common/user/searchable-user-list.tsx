import styles from './searchable-user-listt.module.css'
import { useState, useEffect, useContext } from 'react'
import { Utilities } from '../../../assets'
import { TeamContext } from '../../../context'

// Components
import Dropdown from '../inputs/dropdown'

const SearchableUserList = ({ externalTerm = '', onUserSelected }) => {
  const [term, setTerm] = useState('')

  const { teamMembers } = useContext(TeamContext)

  const lowerCaseTerm = (externalTerm || term).toLowerCase()

  const filteredUsers = teamMembers.filter(user => user.name.toLowerCase().includes(lowerCaseTerm))

  return (
    <div className={`${styles.container} ${(filteredUsers.length === 0 && externalTerm) && styles.empty}`}>
      {!externalTerm &&
        <input className={styles.term} value={term} onChange={(e) => setTerm(e.target.value)} />
      }
      <Dropdown
        additionalClass={styles.dropdown}
        options={filteredUsers.map(user => ({
          id: user.id,
          icon: Utilities.memberProfile,
          label: user.name,
          onClick: () => onUserSelected(user)
        }))}
      />
    </div>
  )
}

export default SearchableUserList
