import styles from './item-field-wrapper.module.css'

import { GeneralImg } from '../../assets'

const ItemFieldWrapper = ({ image, title, children, hasOption = false, optionOnClick = () => { } }) => (
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
        <img src={GeneralImg.logo} />
      </div>
    }
  </div>
)

export default ItemFieldWrapper
