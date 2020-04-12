import { useContext } from 'react'
import styles from './main-layout.module.css'
import Link from 'next/link'
import overview from '../../assets/Icons/Navigation/icn-nav-dashboard.svg'
import { GeneralImg, Navigation, Placeholders } from '../../assets'
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
            img={Navigation.overview}
            text='Overview'
          />
          <HeaderLink
            href='/main/overview'
            img={Navigation.schedule}
            text='Schedule'
          />
          <HeaderLink
            href='/main/overview'
            img={Navigation.assets}
            text='Assets'
          />
          <HeaderLink
            href='/main/overview'
            img={Navigation.reports}
            text='Reports'
          />
        </ul>
        <div className={styles['notifications-wrapper']}>
          <img
            className={styles.notifications}
            src={Navigation.alert} />
        </div>
        <div className={styles.user}>
          <img
            className={styles.profile}
            src={Placeholders.profile} />
          {user?.name}
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
      </footer>
    </>
  )
}

export default AuthLayout
