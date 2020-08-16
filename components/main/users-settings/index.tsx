import styles from './index.module.css'
import { useState, useEffect } from 'react'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import urlUtils from '../../../utils/url'

// Components
import SideNavigation from './side-navigation'
import Team from './team'

const SETTING_OPTIONS_CONTENT = {
    profile: () => <></>,
    billing: () => <></>,
    security: () => <></>,
    team: Team,
    notifications: () => <></>,
    integrations: () => <></>
}

const UserSettings = () => {

    useEffect(() => {
        const activeView = urlUtils.getPathId()
        setActiveView(activeView)
    }, [])

    const [activeView, setActiveView] = useState('')

    let ActiveContent = () => <></>
    if (SETTING_OPTIONS_CONTENT[activeView]) ActiveContent = SETTING_OPTIONS_CONTENT[activeView]

    return (
        <main className={`${styles.container}`}>
            <SideNavigation
                activeView={activeView}
                setActiveView={setActiveView}
            />
            <section className={styles.content}>
                <ActiveContent />
            </section>
        </main>
    )
}

export default UserSettings
