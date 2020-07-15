import styles from './detail-overlay.module.css'
import { Utilities } from '../../../assets'

// Components
import SidePanel from './detail-side-panel'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'

const DetailOverlay = ({ asset, realUrl, closeOverlay, openShareAsset = () => { }, openDeleteAsset = () => { }, isShare = false }) => {

  return (
    <div className={`app-overlay ${styles.container}`}>
      <section className={styles.content}>
        <div className={styles['top-wrapper']}>
          <div className={styles.back} onClick={closeOverlay}>
            <IconClickable src={Utilities.back} />
            <span>Back</span>
          </div>
          <h3>
            {asset.name}
          </h3>
          <div className={styles['asset-actions']}>
            {!isShare &&
              <Button text={'Share'} type={'button'} styleType={'primary'} onClick={openShareAsset} />
            }
            {/* <Button text={'Share'} type={'button'} /> */}
            <a href={realUrl} download={asset.name}>
              <Button text={'Download'} type={'button'} styleType={'secondary'} />
            </a>
          </div>
        </div>
        <div className={styles['img-wrapper']}>
          {asset.type === 'image' &&
            <img src={realUrl} />
          }
          {asset.type === 'video' &&
            <video controls>
              <source src={realUrl}
                type={`video/${asset.extension}`} />
                  Sorry, your browser doesn't support video playback.
            </video>
          }
        </div>
      </section>
      <section className={styles.side}>
        <SidePanel asset={asset} />
      </section>
      {!isShare &&
        <section className={styles.menu}>
          <IconClickable src={Utilities.delete} onClick={openDeleteAsset} />
        </section>
      }
    </div>
  )
}

export default DetailOverlay