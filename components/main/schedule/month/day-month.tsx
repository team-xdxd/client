import Router from 'next/router'
import styles from './day-month.module.css'
import { useState, useRef } from 'react'

// Components
import TypeBadge from '../../../common/misc/type-badge'

const DayMonth = ({ item, socialChannel, type, isMultiple }) => {
  const cloneRef = useRef()
  const [beingDragged, setBeingDragged] = useState(false)

  const beginDrag = (e) => {
    if (cloneRef?.current) {
      e.dataTransfer.setData("itemId", item.id)
      let dayWidth = cloneRef.current.offsetWidth
      let dayHeight = cloneRef.current.offsetHeight
      e.dataTransfer.setDragImage(cloneRef.current, dayWidth / 2, dayHeight / 2)
      setBeingDragged(true)
    }
  }



  return (
    <>
      <div
        className={`${styles.item} ${beingDragged && styles.dragged}`}
        onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}
        draggable={!item.startDate}
        onDragStart={beginDrag}
        onDragEnd={() => setBeingDragged(false)}
      >
        <TypeBadge
          socialChannel={socialChannel}
          type={type}
          name={item.name}
          isMultiple={isMultiple}
          projectTask={item.project?.name}
        />
      </div>
      {!item.startDate &&
        <div className={styles.clone} ref={cloneRef}>
          {/* Draggable element with styles */}
          <TypeBadge
            socialChannel={socialChannel}
            type={type}
            name={item.name}
            isMultiple={isMultiple}
            projectTask={item.project?.name}
          />
        </div>
      }
    </>
  )
}

export default DayMonth