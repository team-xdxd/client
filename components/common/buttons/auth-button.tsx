import styles from './auth-button.module.css'

const AuthButton = ({ text, type, onClick = () => { }, disabled = false }) => (
  <button
    className={styles.container}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default AuthButton
