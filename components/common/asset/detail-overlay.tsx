import styles from './detail-overlay.module.css'
import { Utilities } from '../../../assets'
import { useState, useEffect } from 'react'
import assetApi from '../../../server-api/asset'

// Components
import SidePanel from './detail-side-panel'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'

const DetailOverlay = ({ asset, realUrl, closeOverlay, openShareAsset = () => { }, openDeleteAsset = () => { }, isShare = false }) => {

  const [assetDetail, setAssetDetail] = useState()

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    try {
      if (isShare)
        setAssetDetail(asset)
      else {
        const { data } = await assetApi.getById(asset.id)
        setAssetDetail(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`app-overlay ${styles.container}`}>
      {assetDetail &&
        <section className={styles.content}>
          <div className={styles['top-wrapper']}>
            <div className={styles.back} onClick={closeOverlay}>
              <IconClickable src={Utilities.back} />
              <span>Back</span>
            </div>
            <h3>
              {assetDetail.name}
            </h3>
            <div className={styles['asset-actions']}>
              {!isShare &&
                <Button text={'Share'} type={'button'} styleType={'primary'} onClick={openShareAsset} />
              }
              {/* <Button text={'Share'} type={'button'} /> */}
              <a href={realUrl} download={assetDetail.name}>
                <Button text={'Download'} type={'button'} styleType={'secondary'} />
              </a>
            </div>
          </div>
          <div className={styles['img-wrapper']}>
            {assetDetail.type === 'image' &&
              <img src={realUrl} />
            }
            {assetDetail.type === 'video' &&
              <video controls>
                <source src={realUrl}
                  type={`video/${assetDetail.extension}`} />
                  Sorry, your browser doesn't support video playback.
            </video>
            }
          </div>
        </section>
      }
      {assetDetail &&
        <section className={styles.side}>
          <SidePanel asset={assetDetail} isShare={isShare}/>
        </section>
      }
      {!isShare &&
        <section className={styles.menu}>
          <IconClickable src={Utilities.delete} onClick={openDeleteAsset} />
        </section>
      }
    </div>
  )
}

export default DetailOverlay