import styles from './upcoming.module.css'
import { capitalCase } from 'change-case'
import { GeneralImg } from '../../../assets'

// Components
import UpcomingItem from './upcoming-item'

const Upcoming = ({ type, items = [], addOnClick = () => { } }) => (
  <div className={`${styles.container}`}>
    <div className={styles.heading}>
      <h4>Upcoming {capitalCase(`${type}s`)}</h4>
      <div className={styles.action}>
        <img src={GeneralImg.logo} />
        <span onClick={addOnClick}>
          Add {capitalCase(type)}
        </span>
      </div>
    </div>
    {items.length > 0 ?
      <ul>
        {items.map((item, index) => (
          <UpcomingItem
            key={index}
            date={type === 'project' ? item.publishDate : item.endDate}
            name={item.name}
            status={item.status}
            users={item.users}
            detailUrl={`/main/${type}s/${item.id}`}
          />
        ))}
      </ul>
      :
      <span className={styles.empty}>
        {`No ${capitalCase(type)}s`}
      </span>
    }
  </div>
)

export default Upcoming
