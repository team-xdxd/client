import styles from './simple-button.module.css'

const Button = ({ icon = '', text = '', onClick = () => { }, disabled = false }) => (
  <button
    className={`${styles.container}`}
    type={'button'}
    onClick={onClick}
    disabled={disabled}
  >
    {icon ?
      <img src={icon} />
      :
      <span>{text}</span>
    }
  </button>
)

export default Button
