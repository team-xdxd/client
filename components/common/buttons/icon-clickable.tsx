import styles from './icon-clickable.module.css'

const IconClickable = ({ src, onClick = (e) => { }, additionalClass = '' }) => (
  <img src={src} onClick={onClick} className={`${styles.button} ${additionalClass}`} />
)

export default IconClickable