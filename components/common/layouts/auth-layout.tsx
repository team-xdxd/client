import styles from './auth-layout.module.css'
import Link from 'next/link'
import { GeneralImg } from '../../../assets'

const AuthLayout = ({ children }) => (
  <>
    <header className={styles.header}>
      <Link href='/main/overview'>
        <a>
          <img
            className={styles['logo-img']}
            src={GeneralImg.logoHorizontal} />
        </a>
      </Link>
    </header>
    {children}
    <footer className={styles.footer}>
    </footer>
  </>
)

export default AuthLayout
