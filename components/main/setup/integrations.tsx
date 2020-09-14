import styles from './integrations.module.css'
import { useState, useEffect } from 'react'
import userApi from '../../../server-api/user'
import cookiesUtil from '../../../utils/cookies'
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

  const addIntegration = (integration) => {
    cookiesUtil.set('integrationType', integration.type)
    cookiesUtil.set('onSetup', 'true')
    window.location.replace(integration.oauthUrl)
  }

  const onSave = async () => {

  }

  const userIntegrations = availableIntegrations.map(integration => {
    const existingIntegration = integrations.find(userIntegration => userIntegration.type === integration.type)
    if (existingIntegration) return {
      ...integration,
      ...existingIntegration
    }
    else return integration
  })

  return (
    <div>
      <ul className={styles['integration-list']}>
        {userIntegrations.map(integration => (
          <li key={integration.type}>
            <IntegrationItem
              integrationName={integration.name}
              integrationId={integration.type}
              onClick={() => addIntegration(integration)}
              createdAt={integration.createdAt}
            />
          </li>
        ))}
      </ul>
      <ActionButtons saveAction={onSave} />
    </div>
  )
}

export default Integrations