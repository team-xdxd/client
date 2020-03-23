import styles from './input.module.css'

const Input = (props) => (
  <input
    {...props}
    className={styles.container}

  />
)

export default Input
