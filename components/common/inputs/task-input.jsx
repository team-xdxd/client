import styles from './task-input.module.css'
import DayPicker from 'react-day-picker'
import { useState, useEffect, useRef } from 'react'
import { format, startOfWeek } from 'date-fns'

import { ItemFields, Utilities } from '../../../assets'

// Components
import SearchableUserList from '../user/searchable-user-list'
import UserPhoto from '../user/user-photo'

const TaskInput = ({ name, setName, date, setDate, selectedUser, setSelectedUser }) => {
  const [timeVisible, setTimeVisible] = useState(false)
  const [searchableVisible, setSearchableVisible] = useState(false)
  const [today] = useState(new Date())
  const [tomorrow, setTomorrow] = useState(new Date())
  const [nextWeek, setNextWeek] = useState(new Date())

  const toggleModalVisible = () => {
    setTimeVisible(!timeVisible)
    setSearchableVisible(false)
  }

  const toggleTimeVisible = () => {
    setSearchableVisible(!searchableVisible)
    setTimeVisible(false)
  }

  const handleDayClick = (day, { selected }) => {
    setDate(selected ? undefined : day)
    setTimeVisible(false)
  }

  useEffect(() => {
    setTomorrow(new Date(tomorrow.setDate(tomorrow.getDate() + 1)))
    setNextWeek(startOfWeek(new Date(nextWeek.setDate(nextWeek.getDate() + 8)), { weekStartsOn: 1 }))
  }, [])

  const handleDateSeletion = (date) => {
    setDate(date)
    setTimeVisible(false)
  }

  const handleUserSelection = (user) => {
    if (user.id === selectedUser?.id) setSelectedUser(undefined)
    else setSelectedUser({ ...user, profilePhoto: user.profilePhoto || Utilities.memberProfile })

    setSearchableVisible(false)
  }

  return (
    <div className={`${styles.container}`}>
      <input
        value={name}
        className={`${styles.input}`}
        onChange={(e) => setName(e.target.value)}
      />
      <span className={styles.selected}>
        {date && format(date, 'MMM d')}
      </span>
      <span className={styles['date-icon']} onClick={toggleTimeVisible}>
        < UserPhoto
          noPhoto={Utilities.assignMember}
          photoUrl={selectedUser?.profilePhoto} sizePx={20} tooltipId={'task-input'} tooltipText={selectedUser?.name} />
      </span>
      <span className={styles['date-icon']} onClick={toggleModalVisible}>
        <img src={ItemFields.date} />
      </span>

      {timeVisible &&
        <div className={styles.time}>
          <ul>
            <li onClick={() => handleDateSeletion(today)}>
              <span>Today</span><span>{format(today, 'EEE')}</span>
            </li>
            <li onClick={() => handleDateSeletion(tomorrow)}>
              <span>Tomorrow</span><span>{format(tomorrow, 'EEE')}</span>
            </li>
            <li onClick={() => handleDateSeletion(nextWeek)}>
              <span>Next Week</span><span>{format(nextWeek, 'EEE')}</span>
            </li>
            <li onClick={() => handleDateSeletion(null)}>
              <span>No Date</span>
            </li>
          </ul>
          <div className={styles['day-picker']}>
            <DayPicker
              selectedDays={date}
              onDayClick={handleDayClick} />
          </div>
        </div>
      }
      {searchableVisible &&
        <div className={styles.time}>
          <SearchableUserList onUserSelected={handleUserSelection} selectedList={[selectedUser?.id]} />
        </div>
      }
    </div>
  )
}

export default TaskInput
