import { useState, useContext, useRef } from 'react'
import styles from './main-layout.module.css'
import Link from 'next/link'
import { GeneralImg, Navigation, Placeholders } from '../../../assets'
import { UserContext } from '../../../context'
import Router from 'next/router'

// Components
import HeaderLink from '../layouts/header-link'
import Dropdown from '../inputs/dropdown'

const AuthLayout = ({ children }) => {
  const { user, logOut } = useContext(UserContext)

  const [dropdownVisible, setDropdownVisible] = useState(false)

  const buttonRef = useRef(null)
  const wrapperRef = useRef(null)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
      setDropdownVisible(false)
    }
  }

  const setDropdownOpen = (e, visible) => {
    e.stopPropagation()
    setDropdownVisible(visible)
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
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
            img={Router.pathname.indexOf('overview') !== -1 ? Navigation.overviewSelected : Navigation.overview}
            imgHover={Navigation.overviewSelected}
            text='Overview'
          />
          <HeaderLink
            active={Router.pathname.indexOf('schedule') !== -1}
            href='/main/schedule'
            img={Router.pathname.indexOf('schedule') !== -1 ? Navigation.scheduleSelected : Navigation.schedule}
            imgHover={Navigation.scheduleSelected}
            text='Schedule'
          />
          <HeaderLink
            active={Router.pathname.indexOf('assets') !== -1}
            href='/main/assets'
            img={Router.pathname.indexOf('assets') !== -1 ? Navigation.assetsSelected : Navigation.assets}
            imgHover={Navigation.assetsSelected}
            text='Assets'
          />
          <HeaderLink
            active={Router.pathname.indexOf('reports') !== -1}
            href='/main/reports'
            img={Router.pathname.indexOf('reports') !== -1 ? Navigation.reportsSelected : Navigation.reports}
            imgHover={Navigation.reportsSelected}
            text='Reports'
          />
        </ul>
        <div className={styles['notifications-wrapper']}>
          <img
            className={styles.notifications}
            src={Navigation.alert} />
        </div>
        <div className={styles.user}
          ref={buttonRef}
          onClick={(e) => setDropdownOpen(e, !dropdownVisible)}>
          <img
            className={styles.profile}
            src={Placeholders.profile} />
          {user?.name}
          {dropdownVisible &&
            <div ref={wrapperRef} className={styles['user-dropdown']}>
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
