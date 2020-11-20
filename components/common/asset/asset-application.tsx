import styles from './asset-application.module.css'
import { Assets } from '../../../assets'

const { msword, msexcel, msppt, pdf, html, unknown } = Assets
const AssetApplication = ({ extension }) => {
  return (
    <>
      {extension === 'pdf' ? (
        <div className={styles.container}>
          <img src={pdf} className={styles.icon} />
        </div>
      ) : extension === 'msword' ||
        extension ===
          'vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
        <div className={styles.container}>
          <img src={msword} className={styles.icon} />
        </div>
      ) : extension ===
          'vnd.openxmlformats-officedocument.presentationml.presentation' ||
        extension === 'vnd.ms-powerpoint' ? (
        <div className={styles.container}>
          <img src={msppt} className={styles.icon} />
        </div>
      ) : extension === 'vnd.ms-excel' ||
        extension ===
          'vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
        <div className={styles.container}>
          <img src={msexcel} className={styles.icon} />
        </div>
      ) : extension === 'html' ? (
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

export default AssetApplication
