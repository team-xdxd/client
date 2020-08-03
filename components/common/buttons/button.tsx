import styles from './button.module.css'

const Button = ({ text, type, onClick = (e) => { }, disabled = false, styleType = '' }) => (
  <button
    className={`${styles.container} ${styles[styleType]} ${styles[type]}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default Button
