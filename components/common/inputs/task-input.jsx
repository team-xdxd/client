import styles from './task-input.module.css'
import DayPicker from 'react-day-picker'
import { useState, useEffect } from 'react'
import { format, startOfWeek } from 'date-fns'

import { ItemFields } from '../../../assets'

// Components

const TaskInput = ({ name, setName, date, setDate }) => {
  const [timeModalVisible, setTimeModalVisible] = useState(false)
  const [today] = useState(new Date())
  const [tomorrow, setTomorrow] = useState(new Date())
  const [nextWeek, setNextWeek] = useState(new Date())

  const toggleModalVisible = () => {
    setTimeModalVisible(!timeModalVisible)
  }

  const handleDayClick = (day, { selected }) => {
    setDate(selected ? undefined : day)
    setTimeModalVisible(false)
  }

  useEffect(() => {
    setTomorrow(new Date(tomorrow.setDate(tomorrow.getDate() + 1)))
    setNextWeek(startOfWeek(new Date(nextWeek.setDate(nextWeek.getDate() + 8)), { weekStartsOn: 1 }))
  }, [])

  const handleDateSeletion = (date) => {
    setDate(date)
    setTimeModalVisible(false)
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
      <span className={styles['date-icon']} onClick={toggleModalVisible}>
        <img src={ItemFields.date} />
      </span>
      {/* TODO: Put collaborators or team or whatever this is */}
      {timeModalVisible &&
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
    </div>
  )
}

export default TaskInput
