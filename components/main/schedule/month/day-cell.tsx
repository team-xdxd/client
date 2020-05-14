import styles from './day-cell.module.css'
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

const DayCell = ({ date, currentDate, badgeList, badgeListPrevious }) => {

  const positionedBadges = badgeList.filter(badge => badge.currentWeekPosition !== undefined)
  const nonPositionedBadges = badgeList.filter(badge => badge.currentWeekPosition === undefined)

  const preparedBadgeList = []

  const fillPrevious = (difference) => {
    for (let i = 0; i < difference; i++) {
      if (nonPositionedBadges.length > 0) {
        preparedBadgeList.push({ Badge: nonPositionedBadges.pop().data.Badge })
      } else {
        // Push filler
        preparedBadgeList.push({
          Badge: () => <div className={styles.filler}></div>
        })
      }
    }
  }

  positionedBadges.forEach(badge => {
    const difference = badge.currentWeekPosition - preparedBadgeList.length
    if (difference > 0) {
      fillPrevious(difference)
    }
    let isContinuation
    // Check if badge is continuation
    if (badgeListPrevious?.findIndex(previous => previous.currentWeek === badge.currentWeek && previous.data.id === badge.data.id) !== -1) {
      isContinuation = true
    }
    preparedBadgeList.push({ Badge: badge.data.Badge, isContinuation })
  })

  nonPositionedBadges.forEach(badge => {
    preparedBadgeList.push({ Badge: badge.data.Badge })
  })

  return (
    <div className={`${styles['day']} ${!isSameMonth(date, currentDate) && styles['diff-month']}`}>
      <div className={styles['day-header']}>
        <div className={styles['day-number']}>{dateFormat(date)}</div>
        {date.getDate() === today.getDate() && isSameMonth(date, today) &&
          <div className={styles['today-dot']}></div>
        }
      </div>
      <ul>
        {preparedBadgeList.map(({ isContinuation, Badge }, index) => (
          <li key={index} className={isContinuation && styles.continuation}>
            <Badge
              key={index}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DayCell