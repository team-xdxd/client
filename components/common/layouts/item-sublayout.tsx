import styles from './item-sublayout.module.css'
import Router from 'next/router'
import Link from 'next/link'
import { Utilities } from '../../../assets'

// Components
import SectionButton from '../buttons/section-button'

const ItemSublayout = ({ SideComponent = null, sideActive = true, navElements = [], children, layout = 'double' }) => {
  return (
    <div className={styles.container}>
      <div className={styles['main-component']}>
        <div className={styles.heading}>
          <div className={styles[layout]}>
            <SectionButton
              text='Details'
              active={true}
            />
          </div>
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
          <img src={Utilities.closePanelLight} />
        </div>
        <div className={styles.separator}></div>
        <div className={styles.elements}>
          {navElements.map((navElement, index) => (
            <img key={index} src={navElement.icon} onClick={navElement.onClick} />
          ))}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.more}>
          <img src={Utilities.moreLight} />
        </div>
      </div>
    </div>
  )
}

export default ItemSublayout
