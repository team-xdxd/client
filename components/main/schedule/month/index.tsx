import { useEffect, useRef, useState } from 'react'
import { getWeeksInMonth, startOfMonth, startOfWeek, addDays } from 'date-fns'

import styles from './index.module.css'
import dateUtils from '../../../../utils/date'

// Components
import Day from '../common/day'
import DayMonth from './day-month'

const Month = ({ currentDate, mixedList, updateItem }) => {

  const dayRef = useRef()
  const [calendarDays, setCalendarDays] = useState([])
  const [mappedItems, setMappedItems] = useState({})

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
          newCalendarDays.push({ date: new Date(indDate), weekDay: j })
          indDate = addDays(indDate, 1)
        }
      }
      setCalendarDays(newCalendarDays)
      const newMappedItems = {}
      mixedList.forEach((item) => {
        dateUtils.processDayItem(item, currentDate, newMappedItems, DayMonth)
      })
      const reorderedItems = dateUtils.reorderItems(newMappedItems, currentDate, newCalendarDays)
      setMappedItems(reorderedItems)
    }
  }, [mixedList])

  const onDragDrop = (itemId, date) => {
    updateItem(mixedList.find(item => item.id === itemId), date)
  }

  return (
    <section className={styles.container}>
      <div className={styles.calendar} >
        <div className={styles['day-of-week']}>
          <div ref={dayRef}>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles['date-grid']}>

          {calendarDays.map((day, index) => {
            const isSameMonth = day.date.getMonth() === currentDate.getMonth()
            const itemListForDate = isSameMonth ? mappedItems[day.date.getDate()] : []
            const itemList = itemListForDate || []

            let itemListPrevious = []
            if (index > 0) {
              const previousDay = calendarDays[index - 1]
              const isSameMonthPrevious = previousDay.date.getMonth() === currentDate.getMonth()
              const itemListForDatePrevious = isSameMonthPrevious ? mappedItems[previousDay.date.getDate()] : []
              itemListPrevious = itemListForDatePrevious || []
            }

            return (
              <Day
                currentDate={currentDate}
                date={day.date}
                key={index}
                itemList={itemList}
                itemListPrevious={itemListPrevious}
                itemListNext={[]}
                onDragDrop={(e) => onDragDrop(e.dataTransfer.getData("itemId"), day.date)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Month
