import { capitalCase } from 'change-case'
import styles from './provider-auth-button.module.css'
import logo from '../../assets/login/btn_google_signin_light_normal_web@2x.png'

const ProviderAuthButton = ({ provider, onClick, icon }) => (
  <>
    {provider === 'google' ?
      <button
        className={styles['button-google']}
        onClick={onClick}>
        <img src={logo} className={styles.google} />
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