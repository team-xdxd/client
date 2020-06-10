import styles from './day.module.css'
import { format } from 'date-fns'
import { useState, useRef, useEffect } from 'react'

const isSameMonth = (date, targetDate) => {
  return date.getMonth() === targetDate.getMonth()
}

const dateFormat = (date) => {
  if (date.getDate() === 1)
    return format(date, 'MMM d')
  else
    return format(date, 'd')
}

const today = new Date()

const Day = ({
  id = '',
  date,
  currentDate,
  displayDate = null,
  itemList,
  itemListPrevious,
  itemListNext,
  hasDayHeader = true,
  type = '',
  onDragDrop,
  setActiveView,
  setCurrentDate,
  Waypoint = <></>
}) => {
  const dayRef = useRef()

  const [maxItems, setMaxItems] = useState(10)

  useEffect(() => {
    if (dayRef && dayRef.current) {
      const modifyMaxItems = () => {
        let dayHeight = dayRef.current.offsetHeight
        if (dayHeight <= 300) {
          setMaxItems(4)
        }
        if (dayHeight <= 195) {
          setMaxItems(3)
        }
        if (dayHeight <= 165) {
          setMaxItems(2)
        }
        if (dayHeight <= 128) {
          setMaxItems(1)
        }
      }
      modifyMaxItems()
      window.addEventListener('resize', modifyMaxItems)
      return () => window.removeEventListener('resize', modifyMaxItems)
    }
  }, [dayRef])


  const [dragHovering, setDragHovering] = useState(false)
  const positionedItems = itemList.filter(item => item.currentWeekPosition !== undefined)
  const nonPositionedItems = itemList.filter(item => item.currentWeekPosition === undefined)

  let preparedItemList = []

  const fillPrevious = (difference) => {
    for (let i = 0; i < difference; i++) {
      if (nonPositionedItems.length > 0 && type !== 'week') {
        preparedItemList.push({ Item: nonPositionedItems.pop().data.Item })
      } else {
        // Push filler
        preparedItemList.push({
          Item: () => <div className={styles.filler}></div>
        })
      }
    }
  }

  positionedItems.forEach(item => {
    const difference = item.currentWeekPosition - preparedItemList.length
    if (difference > 0) {
      fillPrevious(difference)
    }

    let isContinuation = false
    // Check if item is continuation
    if (itemListPrevious?.findIndex(previous => previous.currentWeek === item.currentWeek && previous.data.id === item.data.id) !== -1) {
      isContinuation = true
    }

    // Check if item is last iteration
    let isLast = true
    if (itemListNext?.findIndex(next => next.currentWeek === item.currentWeek && next.data.id === item.data.id) !== -1) {
      isLast = false
    }

    preparedItemList.push({ Item: item.data.Item, isContinuation, isLast })
  })

  nonPositionedItems.forEach(item => {
    preparedItemList.push({ Item: item.data.Item })
  })

  let overLimit = false
  if (preparedItemList.length > maxItems) {
    preparedItemList = preparedItemList.slice(0, maxItems)
    overLimit = true
  }

  return (
    <div id={id} ref={dayRef} className={`day ${styles['day']} ${!isSameMonth(date, displayDate || currentDate) && styles['diff-month']} ${styles[type]} ${dragHovering && styles.hovering}`}
      onDragOver={(e) => { e.preventDefault(); setDragHovering(true) }}
      onDragEnter={() => { setDragHovering(true) }}
      onDragLeave={() => { setDragHovering(false) }}
      onDrop={(e) => {
        setDragHovering(false)
        onDragDrop(e)
      }}
    >
      {Waypoint}
      {hasDayHeader &&
        <div className={styles['day-header']}>
          <div className={styles['day-number']}>{dateFormat(date)}</div>
          {date.getDate() === today.getDate() && isSameMonth(date, today) &&
            <div className={styles['today-dot']}></div>
          }
        </div>
      }
      <ul>
        {preparedItemList.map(({ isContinuation, isLast, Item }, index) => (
          <li key={index} className={`${isContinuation && 'continuation'} ${isLast && 'last'}`} >
            <Item
              key={index}
            />
          </li>
        ))}
        {overLimit &&
          <li className={styles['more-li']}>
            <div className={styles.more} onClick={() => {
              setActiveView('list')
              setCurrentDate(date)
            }}>
              View more
            </div>
          </li>
        }
      </ul>
    </div>
  )
}

export default Day