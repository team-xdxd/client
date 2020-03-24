import { capitalCase } from 'change-case'
import styles from './provider-auth-button.module.css'

const ProviderAuthButton = ({ provider, onClick, icon }) => (
  <button
    className={`${styles.button} ${styles[provider]}`}
    onClick={onClick}>
    <div className={styles['btn-icon']}>
      <img src={icon} alt={provider} />
    </div>
    <span className={styles['btn-text']}>
      {`Sign in with ${capitalCase(provider)}`}
    </span>
  </button>
)

export default ProviderAuthButton