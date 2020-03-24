import styles from './auth-layout.module.css'
import { GeneralImg } from '../../assets'

const AuthLayout = ({ children }) => (
  <>
    <header className={styles.header}>
      <img
        className={styles['logo-img']}
        src={GeneralImg.logoHorizontal} />
    </header>
    {children}
    <footer className={styles.footer}>
    </footer>
  </>
)

export default AuthLayout
