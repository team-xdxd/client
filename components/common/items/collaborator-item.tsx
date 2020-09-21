import styles from './collaborator-item.module.css'

// Components
import UserPhoto from '../user/user-photo'

const CollaboratorItem = ({ photoUrl, onRemove }) => {
  return (
    <div className={styles.container}>
      <div className={styles.remove} onClick={onRemove}>x</div>
      <UserPhoto photoUrl={photoUrl} sizePx={40} />
    </div>
  )
}

export default CollaboratorItem