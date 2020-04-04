import styles from './main-layout.module.css'
import Link from 'next/link'
import { GeneralImg } from '../../assets'

const AuthLayout = ({ children }) => (
  <>
    <header className={styles.header}>
      <Link href='/main/overview'>
        <img
          className={styles['logo-img']}
          src={GeneralImg.logoHorizontal} />
      </Link>
    </header>
    {children}
    <footer className={styles.footer}>
    </footer>
  </>
)

export default AuthLayout
