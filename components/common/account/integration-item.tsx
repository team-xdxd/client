import styles from './integration-item.module.css'
import { Integrations } from '../../../assets'
import { Utilities } from '../../../assets'

// Components
import Button from '../buttons/button'
import ButtonIcon from '../buttons/button-icon'

const IntegrationItem = ({ integrationName, integrationId, onClick, createdAt = '' }) => {
  let existingIntegration = createdAt

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {integrationName}
      </div>
      <img src={Integrations[integrationId]} />
      {existingIntegration ?
        <Button
          text={'Connected'}
          type={'button'}
          styleType={'secondary'}
          styleTypes={['input-height']}
          disabled={true}
        />
        :
        <ButtonIcon
          text={'Add Integration'}
          icon={Utilities.addAlt}
          onClick={onClick}
        />
      }

    </div>
  )
}

export default IntegrationItem