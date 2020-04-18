import { capitalCase } from 'change-case'
import styles from './provider-auth-button.module.css'
import { LoginImg } from '../../../assets'

const ProviderAuthButton = ({ provider, onClick, icon }) => (
  <>
    {provider === 'google' ?
      <button
        className={styles['button-google']}
        onClick={onClick}>
        <img src={LoginImg.googleAlt} className={styles.google} />
      </button>
      :
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
    }
  </>
)

export default ProviderAuthButton