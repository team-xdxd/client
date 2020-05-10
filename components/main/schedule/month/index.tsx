import { useEffect, useRef, useState } from 'react'
import { getWeeksInMonth, startOfMonth, startOfWeek, addDays, getDaysInMonth } from 'date-fns'
import Router from 'next/router'
import styles from './index.module.css'

// Components
import DayCell from './day-cell'
import TypeBadge from '../../../common/misc/type-badge'

const Month = ({ currentDate, mixedList }) => {

  const dayRef = useRef()

  const [calendarDays, setCalendarDays] = useState([])

  const [mappedItemsBadges, setMappedItemsBadges] = useState({})


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
    }
  }, [currentDate])

  useEffect(() => {
    const newMappedItemsBadges = {}
    mixedList.forEach((item) => {

      let type
      let socialChannel
      let date
      if (item.itemType === 'campaign') {
        type = item.itemType
        date = item.endDate
      }
      else if (item.itemType === 'project') {
        type = item.type
        date = item.publishDate
        if (type === 'social') {
          socialChannel = item.channel || 'social'
        }
      }
      else {
        type = item.itemType
        date = item.endDate
      }

      if (date) {
        const dayNumber = new Date(date).getDate()

        if (item.startDate) {
          const endDate = new Date(date)
          let iterDate = new Date(item.startDate)
          while (iterDate.getDate() < endDate.getDate() && iterDate.getDate() <= 31) {
            const dateNumber = iterDate.getDate()
            parseItem(item, type, socialChannel, dateNumber, newMappedItemsBadges)
            iterDate = addDays(iterDate, 1)
          }
        }
        parseItem(item, type, socialChannel, dayNumber, newMappedItemsBadges)
      }
    })
    reorderItemBadges(newMappedItemsBadges)
  }, [mixedList, currentDate])

  const parseItem = (item, type, socialChannel, dayNumber, newMappedItemsBadges) => {
    if (!newMappedItemsBadges[dayNumber]) newMappedItemsBadges[dayNumber] = []
    newMappedItemsBadges[dayNumber].push({
      id: item.id, Badge: () => (
        <div
          className={styles.badge}
          onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}
        >
          <TypeBadge
            socialChannel={socialChannel}
            type={type}
            name={item.name}
          />
        </div>
      )
    })
  }

  const reorderItemBadges = (itemBadges) => {
    let currentWeekOrder = {}
    let currentWeek = -1
    calendarDays.forEach(day => {
      if (day.weekDay === 0) {
        currentWeek++
      }
      if (day.date.getMonth() !== currentDate.getMonth()) return
      if (day.weekDay === 0) {
        currentWeekOrder = {}
      }
      const dateNumber = day.date.getDate()
      const mappedItems = itemBadges[dateNumber]
      const nextDayItems = itemBadges[dateNumber + 1]
      if (mappedItems) {
        const newMappedItems = []
        mappedItems.forEach(item => {
          // Det if current week order needs to be preserved
          const currentWeekPosition = currentWeekOrder[item.id]
          if (day.weekDay < 6 && nextDayItems) {
            const isInNextDay = nextDayItems.findIndex(nextItem => nextItem.id === item.id) !== -1

            if (isInNextDay && currentWeekPosition === undefined) {
              currentWeekOrder[item.id] = getAvailablePosition(currentWeekOrder)
              newMappedItems.push({ data: item, currentWeekPosition: currentWeekOrder[item.id], currentWeek })

            } else if (!isInNextDay && currentWeekPosition !== undefined) {
              newMappedItems.push({ data: item, currentWeekPosition, currentWeek })
              currentWeekOrder[item.id] = undefined

            } else {
              newMappedItems.push({ data: item, currentWeekPosition, currentWeek })
            }
          } else newMappedItems.push({ data: item, currentWeekPosition, currentWeek })
        })
        newMappedItems.sort((itema, itemb) => {
          const posA = itema.currentWeekPosition
          const posB = itemb.currentWeekPosition
          if (posA > posB) {
            return 1
          } else if (posA < posB) {
            return -1
          } else return 0
        })
        itemBadges[dateNumber] = newMappedItems
      }
    })
    setMappedItemsBadges(itemBadges)
  }

  const getAvailablePosition = (currentWeekOrder) => {
    let position
    const orderedWeekPos = Object.keys(currentWeekOrder).sort((keyA, keyB) => {
      if (currentWeekOrder[keyA] > currentWeekOrder[keyB]) {
        return 1
      } else if (currentWeekOrder[keyA] > currentWeekOrder[keyB]) {
        return -1
      } else {
        return 0
      }
    })
    orderedWeekPos.forEach((key, index) => {
      if (currentWeekOrder[key] !== index && !position) {
        position = index
      }
    })

    return position || orderedWeekPos.length
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
            const badgeListForDate = isSameMonth ? mappedItemsBadges[day.date.getDate()] : []
            const badgeList = badgeListForDate || []

            let badgeListPrevious = []
            if (index > 0) {
              const previousDay = calendarDays[index - 1]
              const isSameMonthPrevious = previousDay.date.getMonth() === currentDate.getMonth()
              const badgeListForDatePrevious = isSameMonthPrevious ? mappedItemsBadges[previousDay.date.getDate()] : []
              badgeListPrevious = badgeListForDatePrevious || []
            }

            return (
              <DayCell
                currentDate={currentDate}
                date={day.date}
                key={index}
                badgeList={badgeList}
                badgeListPrevious={badgeListPrevious}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Month
