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

const DayCell = ({ date, currentDate, badgeList }) => (
  <div className={`${styles['day']} ${!isSameMonth(date, currentDate) && styles['diff-month']}`}>
    <div className={styles['day-header']}>
      <div className={styles['day-number']}>{dateFormat(date)}</div>
      {date.getDate() === currentDate.getDate() && isSameMonth(date, currentDate) &&
        <div className={styles['today-dot']}></div>
      }
    </div>
    <ul>
      {badgeList.map((Badge, index) => (
        <Badge
          key={index}
        />
      ))}
    </ul>
  </div>
)

export default DayCell