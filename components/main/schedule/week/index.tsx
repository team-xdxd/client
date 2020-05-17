import { useEffect, useRef, useState } from 'react'
import { startOfWeek, addDays } from 'date-fns'
import Router from 'next/router'
import styles from './index.module.css'
import dateUtils from '../../../../utils/date'

// Components
import Day from '../common/day'
import DayWeek from './day-week'

const weekDaysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Week = ({ currentDate, mixedList }) => {

  const [weekDays, setWeekDays] = useState([])
  const [mappedItems, setMappedItems] = useState({})

  useEffect(() => {
    if (currentDate) {
      const newWeekDays = []
      let indDate = startOfWeek(currentDate)
      for (let i = 0; i < 7; i++) {
        newWeekDays.push({ date: new Date(indDate), weekDay: i })
        indDate = addDays(indDate, 1)
      }
      setWeekDays(newWeekDays)
      const newMappedItems = {}
      mixedList.forEach((item) => {
        dateUtils.processDayItem(item, currentDate, newMappedItems, DayWeek)
      })
      const reorderedItems = dateUtils.reorderItems(newMappedItems, currentDate, newWeekDays)
      setMappedItems(reorderedItems)
    }
  }, [mixedList])

  return (
    <section className={styles.container}>
      <div className={styles['day-of-week']}>
        {weekDays.map((weekDay, index) => (
          <div>{`${weekDaysLabel[index]} ${weekDay.date.getDate()}`}</div>
        ))}
      </div>
      <div className={styles['date-row']}>
        {weekDays.map((day, index) => {
          const itemListForDate = mappedItems[day.date.getDate()]
          const itemList = itemListForDate || []

          let itemListPrevious = []
          if (index > 0) {
            const previousDay = weekDays[index - 1]
            const itemListForDatePrevious = mappedItems[previousDay.date.getDate()]
            itemListPrevious = itemListForDatePrevious || []
          }

          let itemListNext = []
          if (index < weekDays.length - 1) {
            const nextDay = weekDays[index + 1]
            const itemListForDateNext = mappedItems[nextDay.date.getDate()]
            itemListNext = itemListForDateNext || []
          }

          return (
            <Day
              currentDate={currentDate}
              date={day.date}
              key={index}
              itemList={itemList}
              itemListPrevious={itemListPrevious}
              itemListNext={itemListNext}
              hasDayHeader={false}
              type={'week'}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Week
