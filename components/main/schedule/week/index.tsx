import { useEffect, useRef, useState } from 'react'
import { startOfWeek, addDays, subDays } from 'date-fns'
import Router from 'next/router'
import styles from './index.module.css'
import dateUtils from '../../../../utils/date'

// Components
import Day from '../common/day'
import DayWeek from './day-week'

const weekDaysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Week = ({ currentDate, mixedList, updateItem, setActiveView, setCurrentDate }) => {
  const [weekDays, setWeekDays] = useState([])
  const [mappedItems, setMappedItems] = useState({})

  useEffect(() => {
    const newWeekDays = []
    let indDate = startOfWeek(currentDate)
    for (let i = 0; i < 7; i++) {
      newWeekDays.push({ date: new Date(indDate), weekDay: i })
      indDate = addDays(indDate, 1)
    }
    setWeekDays(newWeekDays)
    const newMappedItems = {}
    mixedList.forEach((item) => {
      dateUtils.processDayItem(item, newMappedItems, DayWeek)
    })
    const reorderedItems = dateUtils.reorderItems(newMappedItems, newWeekDays)
    setMappedItems(reorderedItems)
  }, [currentDate, mixedList])

  const onDragDrop = (itemId, date) => {
    if (itemId) {
      updateItem(mixedList.find(item => item.id === itemId), date)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles['day-of-week']}>
        {weekDays.map((weekDay, index) => (
          <div key={index}>{`${weekDaysLabel[index]} ${weekDay.date.getDate()}`}</div>
        ))}
      </div>
      <div className={styles['date-row']}>
        {weekDays.map((day, index) => {
          const dayKey = dateUtils.getDateKey(day.date)
          const itemListForDate = mappedItems[dayKey]
          const itemList = itemListForDate || []

          let itemListPrevious = []
          if (index > 0) {
            const previousDay = weekDays[index - 1]
            const dayKeyPrevious = dateUtils.getDateKey(previousDay.date)
            const itemListForDatePrevious = mappedItems[dayKeyPrevious]
            itemListPrevious = itemListForDatePrevious || []
          }

          let itemListNext = []
          if (index < weekDays.length - 1) {
            const nextDay = weekDays[index + 1]
            const dayKeyNext = dateUtils.getDateKey(nextDay.date)
            const itemListForDateNext = mappedItems[dayKeyNext]
            itemListNext = itemListForDateNext || []
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
              itemListNext={itemListNext}
              hasDayHeader={false}
              type={'week'}
              onDragDrop={(e) => {
                onDragDrop(e.dataTransfer.getData("itemId"), day.date)
                e.dataTransfer.clearData()
              }}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Week
