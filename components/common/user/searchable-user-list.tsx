import styles from './searchable-user-listt.module.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { Utilities } from '../../../assets'
import { TeamContext } from '../../../context'

// Components
import Dropdown from '../inputs/dropdown'
import UserPhoto from './user-photo'

const SearchableUserList = ({ externalTerm = '', onUserSelected, filterOut = [], selectedList = [], focusOnRender = true, placeholder = '' }) => {
  const [term, setTerm] = useState('')

  const { teamMembers } = useContext(TeamContext)

  const lowerCaseTerm = (externalTerm || term).toLowerCase()

  const filteredUsers = teamMembers.filter(user => !filterOut.includes(user.id)).filter(user => user.name.toLowerCase().includes(lowerCaseTerm))

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && focusOnRender)
      inputRef.current.focus()
  }, [inputRef.current])

  return (
    <div className={`${styles.container} ${(filteredUsers.length === 0 && externalTerm) && styles.empty}`}>
      {!externalTerm &&
        <input className={styles.term} value={term} onChange={(e) => setTerm(e.target.value)} ref={inputRef} placeholder={placeholder} />
      }
      {filteredUsers.length === 0 ?
        <div className={styles['no-add']}>No members available to add</div>
        :
        <Dropdown
          additionalClass={styles.dropdown}
          options={filteredUsers.map(user => ({
            id: user.id,
            OverrideComp: () => (
              <li key={user.id} className={styles['user-item']} onClick={() => {
                onUserSelected(user)
              }}>
                <span>
                  <UserPhoto photoUrl={user.profilePhoto} sizePx={20} />
                </span>
                <span className={styles['search-result']}>
                  {user.name}
                </span>
                {selectedList.includes(user.id) &&
                  <img src={Utilities.radioButtonEnabled} />
                }
              </li>
            )
          }))}
        />
      }
    </div>
  )
}

export default SearchableUserList
