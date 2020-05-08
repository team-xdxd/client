import { capitalCase } from 'change-case'
import styles from './type-badge.module.css'
import { ProjectTypeChannel, ProjectTypes } from '../../../assets'


const StatusBadge = ({ type, socialChannel, name }) => (
  <div className={`${styles[type]} ${styles.container}`}>
    <img src={socialChannel ? ProjectTypeChannel[socialChannel] : ProjectTypes[type]} />
    <div className={styles.name}>
      {name}
    </div>
  </div>
)

export default StatusBadge
