import styles from './index.module.css'

// Component
import IntegrationsComponent from '../../../common/account/integrations'

const Integrations = () => {
  return (
    <div className={styles.container}>
      <IntegrationsComponent mode='settings'/>
    </div>
  )
}

export default Integrations