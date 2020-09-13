import styles from './integration-item.module.css'
import { Integrations } from '../../../assets'

// Components
import Button from '../buttons/button'

const IntegrationItem = ({ integrationName, integrationId, type = 'new', onClick }) => (
  <div className={styles.container}>
    <div className={styles.name}>
      {integrationName}
    </div>
    <img src={Integrations[integrationId]} />
    <Button
      text={type === 'new' ? 'Add Integration' : 'View Settings'}
      type={'button'}
      styleType={type === 'new' ? 'primary' : 'secondary'}
      onClick={onClick}
    />
  </div>
)

export default IntegrationItem