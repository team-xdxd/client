import { useContext } from 'react'
import styles from './main-layout.module.css'
import Link from 'next/link'
import { GeneralImg, Navigation, Utilities } from '../../../assets'
import { UserContext } from '../../../context'
import Router from 'next/router'

// Components
import HeaderLink from '../layouts/header-link'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import Dropdown from '../inputs/dropdown'
import TrialReminderModal from '../modals/trial-reminder-modal'
import UserPhoto from '../user/user-photo'

const AuthLayout = ({ children }) => {
  const { user, logOut } = useContext(UserContext)

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

            <ToggleableAbsoluteWrapper
              wrapperClass={styles.user}
              Wrapper={({ children }) => (
                <>
                  <UserPhoto photoUrl={user.profilePhoto} extraClass={styles.profile}/>
                  {user?.name}
                  {children}
                </>
              )}
              contentClass={styles['user-dropdown']}
              Content={() => (
                <Dropdown
                  options={[
                    {
                      OverrideComp: () => <SettingsLink name='Company' settingRef='company' />
                    },
                    {
                      OverrideComp: () => <SettingsLink name='Billing' settingRef='billing' />
                    },
                    {
                      OverrideComp: () => <SettingsLink name='Plan' settingRef='plan' />
                    },
                    {
                      OverrideComp: () => <SettingsLink name='Team' settingRef='team' />
                    },
                    { label: 'Log Out', onClick: logOut }
                  ]}
                />
              )}
            />
          </header>
          {children}
          <footer className={styles.footer}>
            <TrialReminderModal />
          </footer>
        </>
      }
    </>
  )
}

export default AuthLayout
