import styles from './detail-overlay.module.css'
import { Utilities } from '../../../assets'
import { useEffect, useState } from 'react'
import assetApi from '../../../server-api/asset'

// Components
import SidePanel from './detail-side-panel'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'

const DetailOverlay = ({ asset, closeOverlay }) => {

  const [realUrl, setRealUrl] = useState('')

  useEffect(() => {
    getRealUrl()
  }, [])

  const getRealUrl = async () => {
    try {
      const { data } = await assetApi.getRealUrl(asset.id)
      setRealUrl(data.realUrl)
    } catch (err) {
      console.log(err)
      //TODO: handle this error
    }
  }

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
            {/* <Button text={'Share'} type={'button'} /> */}
            <a href={realUrl} download={asset.name}>
              <Button text={'Download'} type={'button'} styleType={'secondary'} />
            </a>
          </div>
        </div>
        <div className={styles['img-wrapper']}>
          <img src={realUrl} />
        </div>
      </section>
      <section className={styles.side}>
        <SidePanel asset={asset} />
      </section>
      <section className={styles.menu}>

      </section>
    </div>
  )
}

export default DetailOverlay