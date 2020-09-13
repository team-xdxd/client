import styles from './integrations.module.css'

import userApi from '../../../server-api/user'

// Components
import IntegrationItem from '../../common/user-settings/integration-item'

const Integrations = ({ ActionButtons }) => {

  const onSave = async () => {

  }

  return (
    <div>
      <ActionButtons saveAction={onSave} />
    </div>
  )
}

export default Integrations