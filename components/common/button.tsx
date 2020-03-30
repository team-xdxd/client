import styles from './button.module.css'

const Button = ({ text, type, onClick = () => { }, disabled = false }) => (
  <button
    className={styles.container}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default Button
