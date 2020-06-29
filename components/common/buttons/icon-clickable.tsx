import styles from './icon-clickable.module.css'

const IconClickable = ({ src, onClick = (e) => { } }) => (
  <img src={src} onClick={onClick} className={styles.button} />
)

export default IconClickable