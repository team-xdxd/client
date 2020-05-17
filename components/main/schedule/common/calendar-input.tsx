import { useEffect, useRef, useState } from 'react'
import { format, getWeeksInMonth, startOfMonth, startOfWeek, addDays, endOfMonth, getWeekOfMonth, isSameWeek } from 'date-fns'

import styles from './calendar-input.module.css'

const CalendarInput = ({ currentDate, setCurrentDate }) => {
  const dayRef = useRef()
  const [calendarDays, setCalendarDays] = useState([])

  const [selectedDate, setSelectedDate] = useState(currentDate)

  useEffect(() => {
    if (dayRef && dayRef.current) {
      const resizeWindow = () => {
        let dayWidth = dayRef.current.offsetWidth
        document.documentElement.style.setProperty('--day-calendar-width', `${dayWidth}px`)
      }
      resizeWindow()
      window.addEventListener('resize', resizeWindow)
      return () => window.removeEventListener('resize', resizeWindow)
    }
  }, [dayRef])

  useEffect(() => {
    const newCalendarDays = []
    const weeksAmount = getWeeksInMonth(selectedDate)
    let indDate = startOfWeek(startOfMonth(selectedDate))
    for (let i = 0; i < weeksAmount; i++) {
      for (let j = 0; j < 7; j++) {
        newCalendarDays.push({ date: new Date(indDate), weekDay: j, weekNumber: i })
        indDate = addDays(indDate, 1)
      }
    }
    setCalendarDays(newCalendarDays)
  }, [selectedDate])

  const setNextMonth = () => {
    setSelectedDate(addDays(endOfMonth(selectedDate), 1))
  }

  const setPreviousMonth = () => {
    setSelectedDate(addDays(startOfMonth(selectedDate), -1))
  }

  const selectDate = (date) => {
    setCurrentDate(date)
  }

  const isSameDayAsCurrent = (day) => {
    return currentDate.getMonth() === day.date.getMonth() && currentDate.getDate() === day.date.getDate()
  }

  return (
    <div className={styles.calendar}>
      <div className={styles['month-year']}>
        <div className={styles.arrow} onClick={setPreviousMonth}>
          {'<'}
        </div>
        <div>
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <div className={styles.arrow} onClick={setNextMonth}>
          {'>'}
        </div>
      </div>
      <div className={styles['day-of-week']}>
        <div ref={dayRef}>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className={styles['date-grid']}>
        {calendarDays.map((day, index) => {
          const isSameMonth = selectedDate.getMonth() === day.date.getMonth()
          const isSameWeekDates = isSameWeek(currentDate, day.date)
          const isSameDay = isSameDayAsCurrent(day)
          return (
            <div
              onClick={() => selectDate(day.date)}
              className={
                `${styles.day} ${isSameMonth && styles['same-month']} ${isSameWeekDates && styles['same-week']} ${day.weekDay === 0 && styles['week-start']} ${day.weekDay === 6 && styles['week-end']}`
              }>
              <div
                className={
                  `${styles['day-wrapper']} ${isSameDay && styles['same-day']} `
                }>
                {day.date.getDate()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarInput
