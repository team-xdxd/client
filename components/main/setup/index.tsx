import styles from './index.module.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../context'
import urlUtils from '../../../utils/url'
import Router from 'next/router'

// Components
import Profile from './profile'
import Integrations from './integrations'
import Button from '../../common/buttons/button'

const Setup = () => {

  const { user } = useContext(UserContext)

  const splitName = user?.name.split(' ')[0]

  const AVAILABLE_STEPS = {
    profile: {
      Component: Profile,
      next: 'integrations',
      title: `Welcome, ${splitName}! It is our pleasure to serve you`,
      subtitle: `Lets get your account set up.`
    },
    integrations: {
      Component: Integrations,
      title: `${splitName}, let's connect with your other services`,
      subtitle: `Integrate with other apps to speed up your workflow.`
    }
  }

  const [currentStep, setCurrentStep] = useState(AVAILABLE_STEPS['profile'])

  const nextStep = AVAILABLE_STEPS[currentStep.next]

  const goNext = () => {
    if (nextStep) {
      setCurrentStep(nextStep)
    } else {
      // No more steps, redirect to main menu
      Router.replace('/main/overview')
    }
  }

  useEffect(() => {
    const { step } = urlUtils.getQueryParameters()
    if (step) {
      setCurrentStep(AVAILABLE_STEPS[step as string])
    }
  }, [])

  const ActionButtons = ({ saveAction }) => (
    <div className={styles['action-buttons']}>
      <Button
        text='Skip Step'
        type='button'
        onClick={goNext}
        styleType='secondary'
        styleTypes={['round-corners', 'input-height']}
      />
      <Button
        text='LOOKS GREAT!'
        type='button'
        onClick={async () => {
          await saveAction()
          goNext()
        }}
        styleType='primary'
        styleTypes={['round-corners', 'input-height']}
      />
    </div>
  )

  return (
    <section className={`${styles.container} container-centered`}>
      <div className={`card-content ${styles.content}`}>
        <h2 className={styles.title}>{currentStep.title}</h2>
        <p className={styles.subtitle}>{currentStep.subtitle}</p>
        <currentStep.Component ActionButtons={ActionButtons} />
      </div>
    </section >
  )
}

export default Setup