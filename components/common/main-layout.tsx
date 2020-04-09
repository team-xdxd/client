import { useContext } from 'react'
import styles from './main-layout.module.css'
import Link from 'next/link'
import { GeneralImg } from '../../assets'
import { UserContext } from '../../context'

// Components
import HeaderLink from './header-link'

const AuthLayout = ({ children }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <header className={styles.header}>
        <Link href='/main/overview'>
          <img
            className={styles['logo-img']}
            src={GeneralImg.logo} />
        </Link>
        <ul className={styles['navigation-links']}>
          <HeaderLink
            href='/main/overview'
            img={GeneralImg.logo}
            text='Overview'
          />
          <HeaderLink
            href='/main/overview'
            img={GeneralImg.logo}
            text='Schedule'
          />
          <HeaderLink
            href='/main/overview'
            img={GeneralImg.logo}
            text='Assets'
          />
          <HeaderLink
            href='/main/overview'
            img={GeneralImg.logo}
            text='Reports'
          />
        </ul>
        <div className={styles['notifications-wrapper']}>
          <img
            className={styles.notifications}
            src={GeneralImg.logo} />
        </div>
        <div className={styles.user}>
          <img
            className={styles.profile}
            src={GeneralImg.logo} />
          {user.name}
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
      </footer>
    </>
  )
}

export default AuthLayout
