import Router from 'next/router'
import styles from './day-month.module.css'

// Components
import TypeBadge from '../../../common/misc/type-badge'

const DayMonth = ({ item, socialChannel, type }) => (
  <div
    className={styles.item}
    onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}
  >
    <TypeBadge
      socialChannel={socialChannel}
      type={type}
      name={item.name}
    />
  </div>
)

export default DayMonth