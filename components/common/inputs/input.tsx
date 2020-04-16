import styles from './input.module.css'

const Input = (props) => (
  <input
    {...props}
    className={`${styles.container} ${props.styleType && styles[props.styleType]}`}

  />
)

export default Input
