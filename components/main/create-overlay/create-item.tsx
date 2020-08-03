import styles from './create-item.module.css'
import { capitalCase } from 'change-case'

// Components
import Button from '../../common/buttons/button'

const CreateItem = ({ icon, type, description, onClick }) => (
  <div className={`${styles.container}`}>
    <img src={icon} />
    <h3>{capitalCase(type)}</h3>
    <p>{description}</p>
    <Button
      text={`Create ${capitalCase(type)}`}
      type='button'
      styleType='primary'
      onClick={onClick}
    />
  </div>
)

export default CreateItem
