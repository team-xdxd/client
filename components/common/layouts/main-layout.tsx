import { useContext, useRef } from 'react'
import styles from './main-layout.module.css'
import Link from 'next/link'
import { GeneralImg, Navigation } from '../../../assets'
import { UserContext } from '../../../context'
import Router from 'next/router'
import {
  SETTINGS_BILLING,
  SETTINGS_SECURITY,
  SETTINGS_TEAM,
  SETTINGS_COMPANY,
  SETTINGS_PLAN
} from '../../../constants/permissions'

// Components
import HeaderLink from '../layouts/header-link'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import Dropdown from '../inputs/dropdown'
import TrialReminderModal from '../modals/trial-reminder-modal'
import UserPhoto from '../user/user-photo'
import NoPermissionNotice from '../misc/no-permission-notice'
import Notification from '../notifications/notification'

const MainLayout = ({ children, requiredPermissions = [] }) => {
  const { user, logOut, hasPermission } = useContext(UserContext)

  const pageListRef = useRef(null)

  const SettingsLink = ({ settingRef, name }) => (
    <Link href={`/main/user-settings/${settingRef}`}>
      <a>
        <li>
          <span></span>
          <span>{name}</span>
        </li>
      </a>
    </Link>
  )

  const dropdownOptions = [
    { OverrideComp: () => <SettingsLink name='Profile' settingRef='profile' /> }
  ]
  if (hasPermission([SETTINGS_COMPANY])) dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Company' settingRef='company' /> })
  if (hasPermission([SETTINGS_BILLING])) dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Billing' settingRef='billing' /> })
  if (hasPermission([SETTINGS_PLAN])) dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Plan' settingRef='plan' /> })
  if (hasPermission([SETTINGS_SECURITY])) dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Security' settingRef='security' /> })
  if (hasPermission([SETTINGS_TEAM])) dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Team' settingRef='team' /> })
  dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Notifications' settingRef='notifications' /> })
  dropdownOptions.push({ OverrideComp: () => <SettingsLink name='Integrations' settingRef='integrations' /> })
  dropdownOptions.push({ label: 'Log Out', onClick: logOut })

  const toggleHamurgerList = () => {
    const classType = `visible-block`
    const { current } = pageListRef
    if (current?.classList.contains(classType)) current.classList.remove(classType)
    else current.classList.add(classType)
  }

  return (
    <>
      {user &&
        <>
          <header className={styles.header}>
            <Link href='/main/overview'>
              <a>
                <img
                  className={styles['logo-img']}
                  src={GeneralImg.logo} />
              </a>
            </Link>
            <div className={styles.hamburger} onClick={toggleHamurgerList}>&#9776;</div>
            <ul className={styles['navigation-links']} ref={pageListRef}>
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
              {/* TODO: Reports page will be implemented later */}
              {/* <HeaderLink
                active={Router.pathname.indexOf('reports') !== -1}
                href='/main/reports'
                img={Router.pathname.indexOf('reports') !== -1 ? Navigation.reportsSelected : Navigation.reports}
                imgHover={Navigation.reportsSelected}
                text='Reports'
              /> */}
            </ul>
            <div className={styles['notifications-wrapper']}>
              <Notification />
            </div>

            <ToggleableAbsoluteWrapper
              wrapperClass={styles.user}
              Wrapper={({ children }) => (
                <>
                  <UserPhoto photoUrl={user.profilePhoto} extraClass={styles.profile} sizePx={35} />
                  <span className={styles.name}>{user?.name}</span>
                  {children}
                </>
              )}
              contentClass={styles['user-dropdown']}
              Content={() => (
                <Dropdown
                  options={dropdownOptions}
                />
              )}
            />
          </header>

          {hasPermission(requiredPermissions) ?
            children
            :
            <NoPermissionNotice />
          }
          <footer className={styles.footer}>
            <TrialReminderModal />
          </footer>
        </>
      }
    </>
  )
}

export default MainLayout
