import styles from './upcoming-tasks-item.module.css'
import { capitalCase } from 'change-case'
import { GeneralImg, Navigation } from '../../../assets'
import Router from 'next/router'
import dateUtils from '../../../utils/date'

import { format } from 'date-fns'

// TODO: Det if a task is today, yesterday or tomorrow?
const UpcomingTasksItem = ({ name, status, date, detailUrl }) => {

  let specialText = ''
  if (date) {
    specialText = dateUtils.getSpecialDateString(new Date(date))
  }


  return (
    <li className={`${styles.container}`}>
      <div className={styles['name-status']}>
        <span
          onClick={() => Router.replace(detailUrl)}
          className={`${styles.name} ${status === 'complete' && styles.completed}`}>
          {name}
        </span>
        <span className={styles.status}>
          {capitalCase(status)}
        </span>
      </div>

      <div className={styles.date}>
        <img src={Navigation.scheduleBlack} />
        {date ?
          <span>
            {specialText || format(new Date(date), 'EEE MMM d')}
          </span>
          :
          <span>No Date</span>
        }
      </div>
    </li>
  )
}

export default UpcomingTasksItem
