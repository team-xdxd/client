import Router from 'next/router'
import styles from './day-week.module.css'

import { format } from 'date-fns'

// Components
import TypeBadgeExtended from '../../../common/misc/type-badge-extended'

const DayWeek = ({ item, socialChannel, type, isMultiple, time }) => (
  <div
    className={styles.item}
    onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}
  >
    <TypeBadgeExtended
      socialChannel={socialChannel}
      type={type}
      time={time}
      name={item.name}
      isMultiple={isMultiple}
    />
  </div>
)

export default DayWeek