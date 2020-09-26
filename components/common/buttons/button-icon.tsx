import styles from './button-icon.module.css'

const ButtonIcon = ({ text, disabled = false, icon, onClick }) => {

  return (
    <button
      className={styles.container}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.icon}>
        <img src={icon} />
      </span>
      <span className={styles.text}>
        {text}
      </span>
    </button>
  )
}

export default ButtonIcon
