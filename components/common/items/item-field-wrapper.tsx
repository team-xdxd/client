import styles from './item-field-wrapper.module.css'

import { Utilities } from '../../../assets'

const ItemFieldWrapper = ({
  image,
  title,
  children,
  hasOption = false,
  optionOnClick = () => { },
  error,
  overrideIcon = false,
  OverrideIconComp = () => <></> }) => (
    <div className={styles.container}>
      {overrideIcon ?
        <OverrideIconComp />
        :
        <img src={image} />
      }
      <div className={styles.main}>
        <span className={styles.title}>
          {title}
        </span>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      {hasOption &&
        <div className={styles.option} onClick={optionOnClick}>
          <img src={Utilities.arrowDark} />
        </div>
      }
    </div>
  )

export default ItemFieldWrapper
