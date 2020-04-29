import { useState } from 'react'
import styles from './upcoming.module.css'
import { capitalCase } from 'change-case'
import { GeneralImg, Utilities } from '../../../assets'

// Components
import UpcomingItem from './upcoming-item'
import ConfirmModal from '../../common/modals/confirm-modal'

const Upcoming = ({ type, items = [], addOnClick = () => { }, deleteItem }) => {
  const [activeIndex, setActiveIndex] = useState(-1)

  return <div className={`${styles.container}`}>
    <div className={styles.heading}>
      <h4>Upcoming {capitalCase(`${type}s`)}</h4>
      <div className={styles.action}>
        <img src={Utilities.addLight} />
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
            deleteItem={() => setActiveIndex(index)}
            detailUrl={`/main/${type}s/${item.id}`}
          />
        ))}
      </ul>
      :
      <span className={styles.empty}>
        {`No ${capitalCase(type)}s`}
      </span>
    }
    <ConfirmModal
      closeModal={() => setActiveIndex(-1)}
      confirmAction={() => {
        deleteItem(activeIndex)
        setActiveIndex(-1)
      }}
      confirmText={'Delete'}
      message={
        <span>
          Are you sure you want to &nbsp;<strong>Delete</strong>&nbsp; 1 {type}?
        </span>
      }
      modalIsOpen={activeIndex !== -1}
    />
  </div>
}

export default Upcoming
