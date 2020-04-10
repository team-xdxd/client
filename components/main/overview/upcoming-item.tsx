import styles from './upcoming-item.module.css'
import { GeneralImg } from '../../../assets'


// Component
import StatusBadge from '../../common/status-badge'

const UpcomingItem = ({ status = '' }) => (
  <li className={`${styles.container}`}>
    <span>

    </span>
    <div>
      <img />
      <span></span>
    </div>
    <span>

    </span>
    <StatusBadge status={status} />
    <div className={styles.actions}>
      <img src={GeneralImg.logo} />
      <img src={GeneralImg.logo} />
      <img src={GeneralImg.logo} />
      <img src={GeneralImg.logo} />
    </div>
  </li>
)

export default UpcomingItem
