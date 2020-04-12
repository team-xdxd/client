import styles from './item-sublayout.module.css'
import Router from 'next/router'
import Link from 'next/link'
import { GeneralImg } from '../../assets'

// Components

const ItemSublayout = ({ SideComponent = null, navElements = [], children }) => {
  return (
    <div className={styles.container}>
      <div className={styles['main-component']}>
        <div className={styles.heading}>
          <h4>Details</h4>
        </div>
        <div>
          {children}
        </div>
      </div>

      {SideComponent &&
        <div className={styles['side-component']}>
          {SideComponent}
        </div>
      }

      <div className={styles['side-bar']}>
        <div>
          <img src={GeneralImg.logo} />
        </div>
        <div>
          {navElements.map((navElement, index) => (
            <img key={index} src={navElement.icon} onClick={navElement.onClick} />
          ))}
        </div>
        <div>
          <img src={GeneralImg.logo} />
        </div>
      </div>
    </div>
  )
}

export default ItemSublayout
