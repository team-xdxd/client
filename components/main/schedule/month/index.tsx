import { useEffect, useRef, useState } from 'react'
import { startOfWeek, endOfWeek, addDays, subDays, addMonths, subMonths, differenceInMonths } from 'date-fns'
import { Waypoint } from 'react-waypoint'
import styles from './index.module.css'
import dateUtils from '../../../../utils/date'

// Components
import Day from '../common/day'
import DayMonth from './day-month'


const Month = ({
  monthRange,
  displayDate,
  setDisplayDate,
  currentDate,
  mixedList,
  updateItem,
  setCurrentDate,
  setActiveView
}) => {

  const dayRef = useRef(null)
  const gridContRef = useRef(null)

  const [calendarBoundaries, setCalendarBoundaries] = useState(null)
  const [calendarDays, setCalendarDays] = useState([])
  const [mappedItems, setMappedItems] = useState(null)
  const [repositioning, setRepositioning] = useState(true)
  const [loadingData, setLoadingData] = useState(true)
  const [firstLoad, setFistLoad] = useState(false)
  const [offsetBeginElement, setOffsetBeginElement] = useState(null)


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
    loadData()
  }, [mixedList])

  const loadData = () => {
    if (monthRange) {
      let boundaryBegin = calendarBoundaries?.begin
      let boundaryEnd = calendarBoundaries?.end

      if (!boundaryBegin || monthRange.begin < boundaryBegin) {
        boundaryBegin = monthRange.begin
      }
      if (!boundaryEnd || monthRange.end > boundaryEnd) {
        boundaryEnd = monthRange.end
      }

      const newBoundaries = {
        begin: boundaryBegin,
        beginRender: boundaryBegin,
        end: boundaryEnd,
        endRender: boundaryEnd
      }
      setCalendarBoundaries(newBoundaries)

      const newCalendarDays = []

      let indDate = new Date(newBoundaries.beginRender)
      while (indDate < newBoundaries.endRender) {
        for (let i = 0; i < 7; i++) {
          newCalendarDays.push({ date: new Date(indDate), weekDay: i })
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
  }

  useEffect(() => {
    if (firstLoad && !loadingData) {
      repositionToDate(currentDate)
    }
  }, [currentDate])

  useEffect(() => {
    if (mappedItems) {
      if (offsetBeginElement) {
        gridContRef?.current.scrollTo({
          top: (offsetBeginElement.offsetTop - (offsetBeginElement.offsetHeight * 1.8))
        })
        setOffsetBeginElement(null)
      }
      setLoadingData(false)
      if (!firstLoad) {
        repositionToDate(currentDate)
        setFistLoad(true)
      }
    }
  }, [mappedItems])

  const repositionToDate = (date) => {
    setRepositioning(true)
    const elRef = window.document.getElementById(dateUtils.getDateKey(date))
    gridContRef?.current.scrollTo({
      top: (elRef.offsetTop - (elRef.offsetHeight * 2))
    })
    setRepositioning(false)
  }

  const onDragDrop = (itemId, date) => {
    if (itemId) {
      updateItem(mixedList.find(item => item.id === itemId), date)
    }
  }

  const handleScrollEnter = (day) => {
    const equalBegin = dateUtils.areSameDates(day.date, monthRange.begin)
    const equalEnd = dateUtils.areSameDates(day.date, monthRange.end)

    if (displayDate.getMonth() !== day.date.getMonth()) {
      setDisplayDate(day.date)
    }

    if (!repositioning && !loadingData && (equalBegin || equalEnd)) {
      setLoadingData(true)
      if (equalBegin && differenceInMonths(day.date, calendarBoundaries.begin) <= 1) {
        setOffsetBeginElement(window.document.getElementById(dateUtils.getDateKey(day.date)))
      }

      setCurrentDate(equalEnd ? addDays(day.date, 1) : subDays(day.date, 1))
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.calendar} >
        {loadingData &&
          <div className={styles.loading}></div>
        }
        <div className={styles['day-of-week']}>
          <div ref={dayRef}>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div ref={gridContRef} className={`${styles['date-grid-container']}`}>
          <div className={styles['date-grid']}>

            {calendarDays.map((day, index) => {

              const { date } = day

              const dayKey = dateUtils.getDateKey(date)
              const itemListForDate = mappedItems[dayKey]
              const itemList = itemListForDate || []

              let itemListPrevious = []
              if (index > 0) {
                const previousDate = subDays(date, 1)
                const previousKey = dateUtils.getDateKey(previousDate)
                const itemListForDatePrevious = mappedItems[previousKey]
                itemListPrevious = itemListForDatePrevious || []
              }

              let WaypointComp

              if (day.weekDay === 0 || day.weekDay === 6) {
                WaypointComp = <Waypoint onEnter={() => handleScrollEnter(day)} fireOnRapidScroll={false} />
              }

              return (
                <Day
                  id={dayKey}
                  setActiveView={setActiveView}
                  setCurrentDate={setCurrentDate}
                  currentDate={currentDate}
                  displayDate={displayDate}
                  date={date}
                  key={dayKey}
                  itemList={itemList}
                  itemListPrevious={itemListPrevious}
                  itemListNext={[]}
                  Waypoint={WaypointComp}
                  onDragDrop={(e) => {
                    onDragDrop(e.dataTransfer.getData("itemId"), date)
                    e.dataTransfer.clearData()
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section >
  )
}

export default Month
