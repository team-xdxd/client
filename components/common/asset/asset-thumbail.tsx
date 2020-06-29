import styles from './asset-thumbail.module.css'
import { Utilities } from '../../../assets'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

// Components
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'
import DetailOverlay from './detail-overlay'

const AssetThumbail = ({
  asset,
  thumbailUrl,
  isUploading
}) => {

  const [visibleOverlay, setVisibleOVerlay] = useState(false)

  useEffect(() => {
    if (visibleOverlay) {
      document.body.classList.add('no-overflow')
    } else {
      document.body.classList.remove('no-overflow')
    }
  }, [visibleOverlay])

  return (
    <>
      <div className={styles.container}>
        <div className={styles['image-wrapper']}>
          {isUploading ?
            <p>Uploading...</p>
            :
            <img src={thumbailUrl} alt={asset.name} />
          }
          {!isUploading &&
            <div className={styles['image-button-wrapper']}>
              <Button styleType={'primary'} text={'View Details'} type={'button'}
                onClick={() => setVisibleOVerlay(true)} />
            </div>
          }
        </div>
        <div className={styles.info}>
          <div className='normal-text'>{asset.name}</div>
          <div className={styles['details-wrapper']}>
            <div className='secondary-text'>{format(new Date(asset.createdAt), 'MMM d, yyyy, p')}</div>
            <IconClickable src={Utilities.moreLight} />
          </div>
        </div>
      </div>
      {visibleOverlay &&
        <DetailOverlay
          asset={asset}
          closeOverlay={() => setVisibleOVerlay(false)} />
      }
    </>
  )
}

export default AssetThumbail