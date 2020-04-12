import { capitalCase } from 'change-case'
import styles from './status-badge.module.css'

const StatusBadge = ({ status }) => (
  <div className={`${styles[status]} ${styles.container}`}>
    {capitalCase(status)}
  </div>
)

export default StatusBadge
