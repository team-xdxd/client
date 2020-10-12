import styles from './button.module.css'

const Button = ({ text, type, onClick = (e) => { }, disabled = false, styleType = '', styleTypes = [] }) => (
  <button
    className={`${styles.container} ${styles[styleType]} ${styles[type]} ${styleTypes.map(styleItem => styles[styleItem]).join(' ')}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default Button
