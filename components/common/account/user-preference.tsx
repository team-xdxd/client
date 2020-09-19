import styles from './user-preference.module.css'
import { Utilities } from '../../../assets'

const { radioButtonEnabled, radioButtonNormal } = Utilities

const UserPreference = ({ enabled, setPreference, title, description }) => (
  <div className={styles.container}>
    <div className={'fields-first'}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className={styles['radio-options']}>
      <div className={styles.option}>
        <div>On</div>
        <img src={enabled ? radioButtonEnabled : radioButtonNormal}
          onClick={() => setPreference(true)} />
      </div>
      <div className={styles.option}>
        <div>Off</div>
        <img src={enabled ? radioButtonNormal : radioButtonEnabled}
          onClick={() => setPreference(false)} />
      </div>
    </div>
  </div>
)

export default UserPreference