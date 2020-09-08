import styles from './trial-reminder-modal.module.css'
import { differenceInDays } from 'date-fns'
import { useState, useEffect, useContext } from 'react'
import { UserContext, TeamContext } from '../../../context'
import cookiesUtil from '../../../utils/cookies'
import Link from 'next/link'

// Components
import Base from '../../common/modals/base'
import Button from '../buttons/button'

const BENEFITS = [
  {
    name: 'Save Time.',
    desc: 'All-in-one Marketing hub for your team.'
  },
  {
    name: 'Save Money.',
    desc: 'Do more with less.'
  },
  {
    name: 'Grow your Business.',
    desc: 'Learn fast & Optimize your campaigns.'
  }
]

const TrialReminderModal = () => {

  const { user } = useContext(UserContext)
  const { team, getTeam } = useContext(TeamContext)

  const [active, setActive] = useState(true)

  useEffect(() => {
    getTeam(true)
  }, [])

  useEffect(() => {
    // Get popup show status from cookies
    const popupShown = cookiesUtil.get('trialPopup')
    if (!popupShown && team && user) {
      // Check if 1 day remianing on trial
      const { status, endDate } = team.plan
      const dateDifference = differenceInDays(new Date(endDate), new Date())
      if (status === 'trial' && dateDifference <= 1) {
        setActive(true)
        cookiesUtil.set('trialPopup', 'shown')
      }
    }
  }, [team, user])

  const firstName = user?.name.split(' ')[0]

  return (
    <Base
      modalIsOpen={active}
      closeModal={() => setActive(false)} >
      <div className={styles.container}>
        <h2 className={styles.header}>{`Hi ${firstName}...Time Flies!`}</h2>
        <h2 className={styles.header}>{`Your Free Trial Expires Tomorrow`}</h2>
        <p className={styles.desc}>In order to keep your team operating at full strength with Sparkfive, subscribe today</p>
        <Link href='/main/user-settings/plans'>
          <a>
            <Button
              text='SUBSCRIBE NOW'
              type='button'
              styleType='input-height-primary'
            />
          </a>
        </Link>
        <h3>Unleash Your Brand</h3>
        <ul>
          {BENEFITS.map(({ name, desc }, index) => (
            <li>
              <div>{name}</div>
              <div>{desc}</div>
            </li>
          ))}
        </ul>
        <p className={styles.desc}>Please don't hestitate to call us with any questions or contact us by email support@sparkfive.com</p>
        <div className={styles.desc} >Sincerely,</div>
        <div className={styles.desc}>The Sparkfive Team</div>
      </div>
    </Base >
  )
}

export default TrialReminderModal