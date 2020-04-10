import styles from './nav-button.module.css'

const NavButton = ({ text, type, onClick = () => { }, disabled = false }) => (
  <button
    className={styles.container}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default NavButton
