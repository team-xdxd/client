import styles from './integrations.module.css'
import { useState, useEffect } from 'react'
import userApi from '../../../server-api/user'
import parameterApi from '../../../server-api/parameter'

// Components
import IntegrationItem from '../../common/user-settings/integration-item'

const Integrations = ({ ActionButtons }) => {

  const [integrations, setIntegrations] = useState([])
  const [availableIntegrations, setAvailableIntegrations] = useState([])

  useEffect(() => {
    getIntegrations()
    getAvailableIntegrations()
  }, [])

  const getAvailableIntegrations = async () => {
    try {
      const { data } = await parameterApi.getAvailableIntegrations()
      setAvailableIntegrations(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getIntegrations = async () => {
    try {
      const { data } = await userApi.getIntegrations()
      setIntegrations(data)
    } catch (err) {
      console.log(err)
    }
  }

  const onSave = async () => {

  }

  return (
    <div>
      <ul className={styles['integration-list']}>
        {availableIntegrations.map(integration => (
          <li key={integration.type}>
            <IntegrationItem
              integrationName={integration.name}
              integrationId={integration.type}
              onClick={() => { }}
            />
          </li>
        ))}
      </ul>
      <ActionButtons saveAction={onSave} />
    </div>
  )
}

export default Integrations