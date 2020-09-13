import styles from './integrations-item.module.css'

// Components
import Button from '../buttons/button'

const IntegrationItem = ({ integrationName, icon, type = 'new', onClick }) => (
  <div>
    <div>
      {integrationName}
    </div>
    <img src={icon} />
    <Button
      text={type === 'new' ? 'Add Integration' : 'View Settings'}
      type={'button'}
      styleType={type === 'new' ? 'primary' : 'secondary'}
      onClick={onClick}
    />
  </div>
)

export default IntegrationItem