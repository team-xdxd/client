import styles from './index.module.css'
import { useState } from 'react'
import { capitalCase } from 'change-case'

// Components
import SectionButton from '../../../common/buttons/section-button'
import Subscription from './subscription'
import PaymentMethod from './payment-method'
import Invoices from './invoices'

const SETTING_SECTIONS_CONTENT = {
  subscription: Subscription,
  invoices: Invoices,
  paymentMethod: PaymentMethod
}

const Billing = () => {
  const [activeSection, setActiveSection] = useState('subscription')
  const ActiveContent = SETTING_SECTIONS_CONTENT[activeSection]

  const SectionButtonOption = ({ section }) => (
    <SectionButton
      text={capitalCase(section)}
      active={activeSection === section}
      onClick={() => setActiveSection(section)}
    />
  )

  return (
    <div className={styles.container}>
      <div className={styles['section-buttons']}>
        <SectionButtonOption section='subscription' />
        <SectionButtonOption section='invoices' />
        <SectionButtonOption section='paymentMethod' />
      </div>
      <ActiveContent />
    </div>
  )
}

export default Billing