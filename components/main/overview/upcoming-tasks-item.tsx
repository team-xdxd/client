import styles from './upcoming-tasks-item.module.css'
import { capitalCase } from 'change-case'
import { GeneralImg, Navigation } from '../../../assets'
import dateUtils from '../../../utils/date'
import Link from 'next/link'

import { format } from 'date-fns'

// TODO: Det if a task is today, yesterday or tomorrow?
const UpcomingTasksItem = ({ name, status, date, detailUrl, projectName, projectDetailUrl }) => {

  let specialText = ''
  if (date) {
    specialText = dateUtils.getSpecialDateString(new Date(date))
  }


  return (
    <li className={`${styles.container}`}>
      <div className={styles['name-status']}>
        <div className={styles.names}>
          <Link href={detailUrl}>
            <a>
              <span
                className={`${styles.name} ${status === 'completed' && styles.completed}`}>
                {name}
              </span>
            </a>
          </Link>
          {projectName &&
            <Link href={projectDetailUrl}>
              <a>
                <span
                  className={`${styles['project-name']}`}>
                  {`Project: ${projectName}`}
                </span>
              </a>
            </Link>
          }
        </div>
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
