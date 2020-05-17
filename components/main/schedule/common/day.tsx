import styles from './day.module.css'
import { format } from 'date-fns'

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

const Day = ({ date, currentDate, itemList, itemListPrevious, itemListNext, hasDayHeader = true, type = '' }) => {

  const positionedItems = itemList.filter(item => item.currentWeekPosition !== undefined)
  const nonPositionedItems = itemList.filter(item => item.currentWeekPosition === undefined)

  const preparedItemList = []

  const fillPrevious = (difference) => {
    for (let i = 0; i < difference; i++) {
      if (nonPositionedItems.length > 0) {
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

  return (
    <div className={`day ${styles['day']} ${!isSameMonth(date, currentDate) && styles['diff-month']} ${styles[type]}`}>
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
          <li key={index} className={`${isContinuation && 'continuation'} ${isLast && 'last'}`}>
            <Item
              key={index}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Day