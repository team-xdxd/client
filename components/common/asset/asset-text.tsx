import styles from './asset-text.module.css'
import { Assets } from '../../../assets'

const { html, unknown } = Assets
const AssetText = ({ extension }) => {
  return (
    <>
      {extension === 'html' ? (
        <div className={styles.container}>
          <img src={html} className={styles.icon} />
        </div>
      ) : (
        <div className={styles.container}>
          <img src={unknown} className={styles.icon} />
        </div>
      )}
    </>
  )
}

export default AssetText
