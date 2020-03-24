import styles from './button.module.css'

const Button = ({ text, type, onClick = () => { } }) => (
  <button
    className={styles.container}
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
)

export default Button
