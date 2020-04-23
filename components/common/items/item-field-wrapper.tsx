import styles from './item-field-wrapper.module.css'

import { Utilities } from '../../../assets'

const ItemFieldWrapper = ({ image, title, children, hasOption = false, optionOnClick = () => { }, error }) => (
  <div className={styles.container}>
    <img src={image} />
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
        <img src={Utilities.arrowBlue} />
      </div>
    }
  </div>
)

export default ItemFieldWrapper
