import styles from './item-sublayout.module.css'
import Router from 'next/router'
import Link from 'next/link'
import { Utilities } from '../../../assets'

// Components

const ItemSublayout = ({ SideComponent = null, sideActive = false, navElements = [], children }) => {
  return (
    <div className={styles.container}>
      <div className={styles['main-component']}>
        <div className={styles.heading}>
          <h4>Details</h4>
        </div>
        <div className={styles.children}>
          {children}
        </div>
      </div>

      {SideComponent && sideActive &&
        <div className={styles['side-component']}>
          {SideComponent}
        </div>
      }

      <div className={styles['side-bar']}>
        <div>
          <img src={Utilities.closePanel} />
        </div>
        <div>
          {navElements.map((navElement, index) => (
            <img key={index} src={navElement.icon} onClick={navElement.onClick} />
          ))}
        </div>
        <div>
          <img src={Utilities.more} />
        </div>
      </div>
    </div>
  )
}

export default ItemSublayout
