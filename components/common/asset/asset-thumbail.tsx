import styles from './asset-thumbail.module.css'
import { Utilities, Assets } from '../../../assets'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

// Components
import AssetImg from './asset-img'
import AssetVideo from './asset-video'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'
import DetailOverlay from './detail-overlay'
import AssetOptions from './asset-options'

const AssetThumbail = ({
  asset,
  thumbailUrl,
  realUrl,
  isUploading,
  isSelected = false,
  isLoading = false,
  toggleSelected = () => { },
  openDeleteAsset = () => { },
  openMoveAsset = () => { },
  openShareAsset = () => { },
  openArchiveAsset = () => { },
}) => {

  const [visibleOverlay, setVisibleOVerlay] = useState(false)

  useEffect(() => {
    if (visibleOverlay) {
      document.body.classList.add('no-overflow')
    } else {
      document.body.classList.remove('no-overflow')
    }
    return () => document.body.classList.remove('no-overflow')
  }, [visibleOverlay])

  return (
    <>
      <div className={`${styles.container} ${isLoading && 'loadable'}`}>
        <div className={styles['image-wrapper']}>
          {isUploading &&
            <>
              <p className={styles.uploading}>Uploading...</p>
            </>
          }
          {asset.type === 'image' && <AssetImg assetImg={thumbailUrl} type={asset.type} name={asset.name} opaque={isUploading}/>}
          {asset.type === 'video' && <AssetVideo asset={asset} realUrl={realUrl} additionalClass={styles['video-wrapper']} />}
          {!isUploading && !isLoading &&
            <>
              <div className={`${styles['selectable-wrapper']} ${isSelected && styles['selected-wrapper']}`}>
                {isSelected ?
                  <IconClickable src={Utilities.radioButtonEnabled} additionalClass={styles['select-icon']} onClick={toggleSelected} />
                  :
                  <IconClickable src={Utilities.radioButtonNormal} additionalClass={styles['select-icon']} onClick={toggleSelected} />
                }
              </div>
              <div className={styles['image-button-wrapper']}>
                <Button styleType={'primary'} text={'View Details'} type={'button'}
                  onClick={() => setVisibleOVerlay(true)} />
              </div>
            </>
          }
        </div>
        <div className={styles.info}>
          <div className='normal-text'>{asset.name}</div>
          <div className={styles['details-wrapper']}>
            <div className='secondary-text'>{format(new Date(asset.createdAt), 'MMM d, yyyy, p')}</div>
            <AssetOptions
              asset={asset}
              openArchiveAsset={openArchiveAsset}
              openDeleteAsset={openDeleteAsset}
              openMoveAsset={openMoveAsset}
              realUrl={realUrl}
            />
          </div>
        </div>
      </div>
      {visibleOverlay &&
        <DetailOverlay
          asset={asset}
          realUrl={realUrl}
          openShareAsset={openShareAsset}
          openDeleteAsset={openDeleteAsset}
          closeOverlay={() => setVisibleOVerlay(false)} />
      }
    </>
  )
}

export default AssetThumbail