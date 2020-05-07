import { useEffect, useRef, useState } from 'react'
import { getWeeksInMonth, startOfMonth, startOfWeek, addDays, format } from 'date-fns'
import styles from './index.module.css'
// Components

const Month = ({ currentDate }) => {

  const dayRef = useRef()

  const [calendarDays, setCalendarDays] = useState([])

  useEffect(() => {
    if (dayRef && dayRef.current) {
      const resizeWindow = () => {
        let dayWidth = dayRef.current.offsetWidth
        document.documentElement.style.setProperty('--day-width', `${dayWidth}px`)
      }
      resizeWindow()
      window.addEventListener('resize', resizeWindow)
      return () => window.removeEventListener('resize', resizeWindow)
    }
  }, [dayRef])

  useEffect(() => {
    if (currentDate) {
      const newCalendarDays = []
      const weeksAmount = getWeeksInMonth(currentDate)
      let indDate = startOfWeek(startOfMonth(currentDate))
      for (let i = 0; i < weeksAmount; i++) {
        for (let j = 0; j < 7; j++) {
          newCalendarDays.push(new Date(indDate))
          indDate = addDays(indDate, 1)
        }
      }
      setCalendarDays(newCalendarDays)
    }
  }, [currentDate])

  const dateFormat = (date) => {
    if (date.getDate() === 1)
      return format(date, 'MMM d')
    else
      return format(date, 'd')
  }

  const isSameMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  return (
    <section className={styles.container}>
      <div className={styles.calendar} >
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

          {calendarDays.map((date, index) => (
            <div className={`${styles['day']} ${!isSameMonth(date) && styles['diff-month']}`}>
              <div className={styles['day-header']}>
                <div className={styles['day-number']}>{dateFormat(date)}</div>
                {date.getDate() === currentDate.getDate() && isSameMonth(date) &&
                  <div className={styles['today-dot']}></div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Month
