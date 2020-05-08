import { useEffect, useRef, useState } from 'react'
import { getWeeksInMonth, startOfMonth, startOfWeek, addDays } from 'date-fns'
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
          newCalendarDays.push(new Date(indDate))
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

        if (!newMappedItemsBadges[dayNumber]) newMappedItemsBadges[dayNumber] = []

        newMappedItemsBadges[dayNumber].push(
          () => (
            <div
              className={styles.badge}
              onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}
            >
              <TypeBadge
                socialChannel={socialChannel}
                type={type}
                name={item.name}
              />
            </div>)
        )
      }
    })
    setMappedItemsBadges(newMappedItemsBadges)
  }, [mixedList, currentDate])

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

          {calendarDays.map((date, index) => {
            const badgeListForDate = mappedItemsBadges[date.getDate()]
            const badgeList = badgeListForDate || []

            return (
              <DayCell
                currentDate={currentDate}
                date={date}
                key={index}
                badgeList={badgeList}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Month
