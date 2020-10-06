import styles from './spinner-overlay.module.css'

// Components
import Spinner from './spinner'

const SpinnerOverlay = () => (
  <div className={styles.container}>
    <Spinner />
  </div>
)

export default SpinnerOverlay
