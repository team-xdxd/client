import styles from './button.module.css'

const Button = ({ text }) => (
  <button className={styles.container}>
    {text}
  </button>
)

export default Button
