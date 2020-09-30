import styles from './sub-header.module.css'
import { useRef, useEffect, useState } from 'react'
import { Utilities } from '../../../assets'

const SubHeader = ({
  pageTitle,
  children,
  editable = false,
  additionalClass = '',  
  PreComponent = null,
  onAltEditionClick = () => { }
}) => {

  return (
    <section className={`${styles.container} ${additionalClass}`}>
      {PreComponent &&
        <PreComponent />
      }
      <div className={styles['header-wrapper']}>
        <h1>
          <span>{pageTitle}</span>
        </h1>
        {editable &&
          <img onClick={onAltEditionClick} className={styles.edit} src={Utilities.editWhite} />
        }
      </div>
      {children}
    </section>
  )
}

export default SubHeader
