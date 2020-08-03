import Router from 'next/router'
import styles from './day-week.module.css'
import { useState, useRef } from 'react'

// Components
import TypeBadgeExtended from '../../../common/misc/type-badge-extended'

const DayWeek = ({ item, socialChannel, type, isMultiple, time }) => {
  const cloneRef = useRef()
  const realRef = useRef()
  const [beingDragged, setBeingDragged] = useState(false)

  const beginDrag = (e) => {
    if (cloneRef?.current) {
      const realDayWidth = realRef.current.offsetWidth
      document.documentElement.style.setProperty('--day-week-width', `${realDayWidth}px`)
      e.dataTransfer.setData("itemId", item.id)
      const dayWidth = cloneRef.current.offsetWidth
      const dayHeight = cloneRef.current.offsetHeight
      e.dataTransfer.setDragImage(cloneRef.current, dayWidth / 2, dayHeight / 2)
      setBeingDragged(true)
    }
  }

  return (
    <>
      <div
        ref={realRef}
        className={`${styles.item} ${beingDragged && styles.dragged}`}
        onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}
        draggable={!item.startDate}
        onDragStart={beginDrag}
        onDragEnd={() => setBeingDragged(false)}
      >
        <TypeBadgeExtended
          socialChannel={socialChannel}
          type={type}
          time={time}
          name={item.name}
          isMultiple={isMultiple}
        />
      </div>
      {!item.startDate &&
        <div className={styles.clone} ref={cloneRef}>
          {/* Draggable element with styles */}
          <TypeBadgeExtended
            socialChannel={socialChannel}
            type={type}
            time={time}
            name={item.name}
            isMultiple={isMultiple}
          />
        </div>
      }
    </>
  )
}

export default DayWeek