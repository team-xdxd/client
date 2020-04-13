import styles from './upcoming-tasks-item.module.css'
import { capitalCase } from 'change-case'
import { GeneralImg, Navigation } from '../../../assets'

import { format } from 'date-fns'

// TODO: Det if a task is today, yesterday or tomorrow?
const UpcomingTasksItem = ({ name, status, date }) => (
  <li className={`${styles.container}`}>
    <div className={styles['name-status']}>
      <span className={`${styles.name} ${status === 'completed' && styles.copleted}`}>
        {name}
      </span>
      <span className={styles.status}>
        {capitalCase(status)}
      </span>
    </div>
    <div className={styles.date}>
      <img src={Navigation.scheduleBlack} />
      <span>
        {format(new Date(date), 'd MMM yyyy')}
      </span>
    </div>
  </li>
)

export default UpcomingTasksItem
