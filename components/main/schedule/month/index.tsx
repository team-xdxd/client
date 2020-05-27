import { useEffect, useRef, useState } from 'react'
import { getWeeksInMonth, startOfMonth, startOfWeek, addDays, subDays } from 'date-fns'

import styles from './index.module.css'
import dateUtils from '../../../../utils/date'

// Components
import Day from '../common/day'
import DayMonth from './day-month'


const Month = ({ currentDate, mixedList, updateItem, setCurrentDate, setActiveView }) => {

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
        dateUtils.processDayItem(item, newMappedItems, DayMonth)
      })
      const reorderedItems = dateUtils.reorderItems(newMappedItems, newCalendarDays)
      setMappedItems(reorderedItems)
    }
  }, [mixedList])

  const onDragDrop = (itemId, date) => {
    if (itemId) {
      updateItem(mixedList.find(item => item.id === itemId), date)
    }
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
            const dayKey = `${day.date.getDate()}-${day.date.getMonth()}`
            const itemListForDate = mappedItems[dayKey]
            const itemList = itemListForDate || []

            let itemListPrevious = []
            if (index > 0) {
              const previousDate = subDays(day.date, 1)
              const previousKey = `${previousDate.getDate()}-${previousDate.getMonth()}`
              const itemListForDatePrevious = mappedItems[previousKey]
              itemListPrevious = itemListForDatePrevious || []
            }

            return (
              <Day
                setActiveView={setActiveView}
                setCurrentDate={setCurrentDate}
                currentDate={currentDate}
                date={day.date}
                key={index}
                itemList={itemList}
                itemListPrevious={itemListPrevious}
                itemListNext={[]}
                onDragDrop={(e) => {
                  onDragDrop(e.dataTransfer.getData("itemId"), day.date)
                  e.dataTransfer.clearData()
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Month
