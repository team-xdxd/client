import { useState, useContext } from 'react'
import styles from './main-layout.module.css'
import Link from 'next/link'
import { GeneralImg, Navigation, Placeholders } from '../../../assets'
import { UserContext } from '../../../context'
import Router from 'next/router'

// Components
import HeaderLink from '../layouts/header-link'
import Dropdown from '../inputs/dropdown'

const AuthLayout = ({ children }) => {
  const [userDropdownVisible, setUserDropdownVisible] = useState(false)
  const { user, logOut } = useContext(UserContext)

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible)
  }

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
            active={Router.pathname.indexOf('overview') !== -1}
            href='/main/overview'
            img={Navigation.overview}
            text='Overview'
          />
          <HeaderLink
            active={Router.pathname.indexOf('schedule') !== -1}
            href='/main/schedule'
            img={Navigation.schedule}
            text='Schedule'
          />
          <HeaderLink
            active={Router.pathname.indexOf('assets') !== -1}
            href='/main/assets'
            img={Navigation.assets}
            text='Assets'
          />
          <HeaderLink
            active={Router.pathname.indexOf('reports') !== -1}
            href='/main/reports'
            img={Navigation.reports}
            text='Reports'
          />
        </ul>
        <div className={styles['notifications-wrapper']}>
          <img
            className={styles.notifications}
            src={Navigation.alert} />
        </div>
        <div className={styles.user} onClick={toggleUserDropdown}>
          <img
            className={styles.profile}
            src={Placeholders.profile} />
          {user?.name}
          {userDropdownVisible &&
            <div className={styles['user-dropdown']}>
              <Dropdown
                options={[{ label: 'Log Out' }]}
                onClick={logOut}
              />
            </div>
          }
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
      </footer>
    </>
  )
}

export default AuthLayout
