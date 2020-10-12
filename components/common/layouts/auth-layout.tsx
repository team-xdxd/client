import { useContext } from 'react'
import { LoadingContext } from '../../../context'
import styles from './auth-layout.module.css'
import Link from 'next/link'
import { GeneralImg } from '../../../assets'

// Components
import SpinnerOverlay from '../spinners/spinner-overlay'

const AuthLayout = ({ children }) => {

  const { isLoading } = useContext(LoadingContext)

  return (
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
      {isLoading && <SpinnerOverlay />}
      {children}
      <footer className={styles.footer}>
      </footer>
    </>
  )
}

export default AuthLayout
