import asset from "../../../server-api/asset"
import styles from "./list-item.module.css"
import { Utilities, Assets } from '../../../assets'
import filesize from 'filesize'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

import StatusBadge from '../../common/misc/status-badge'

// Components
import AssetImg from './asset-img'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'
import DetailOverlay from './detail-overlay'
import AssetOptions from './asset-options'


const ListItem = ({
  assetItem: {
    asset,
    thumbailUrl,
    realUrl,
    isUploading,
    isSelected = false,
    isLoading = false
  },
  index,
  toggleSelected = () => { },
  openDeleteAsset = () => { },
  openMoveAsset = () => { },
  openShareAsset = () => { },
  openCopyAsset = () => { },
  openArchiveAsset = () => { },
  downloadAsset = () => { }
}) => {

  const dateFormat = 'MMM do, yyyy h:mm a'

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
      <div className={styles.list}>
        {index === 0 &&
          <div className={styles.header}>

            <h4> </h4>
            <h4>Name</h4>
            <h4>Stage</h4>
            <h4>Type</h4>
            <h4>Extension</h4>
            <h4>Size</h4>
            <h4>Created At</h4>
            <h4></h4>
          </div>
        }
        <div className={styles.item}>
          <div className={`${styles['selectable-wrapper']} ${isSelected && styles['selected-wrapper']}`}>
            {!isLoading &&
              <>
                {isSelected ?
                  <IconClickable src={Utilities.radioButtonEnabled} additionalClass={styles['select-icon']} onClick={toggleSelected} />
                  :
                  <IconClickable src={Utilities.radioButtonNormal} additionalClass={styles['select-icon']} onClick={toggleSelected} />
                }
              </>
            }
          </div>
          <div className={`${styles.thumbnail} ${isLoading && 'loadable'}`}>
            {asset.type === 'image' && <AssetImg assetImg={thumbailUrl} type={asset.type} name={asset.name} />}
            {asset.type === 'video' &&
              <video preload='metadata'>
                <source src={realUrl}
                  type={`video/${asset.extension}`} />
              </video>
            }
          </div>
          <div className={`${styles.name} ${isLoading && 'loadable'}`} onClick={() => setVisibleOVerlay(!isLoading)}>
            {asset.name}
          </div>
          <div className={styles.status}>
            {isUploading && 'Uplaoding...'}
            {!isLoading && !isUploading && <StatusBadge status={asset.stage} />}
          </div>
          <div className={`${styles.field_name} ${isLoading && 'loadable'}`}>
            {!isUploading && asset.type}
          </div>
          <div className={styles.field_name}>
            {!isLoading && asset.extension}
          </div>
          <div className={styles.field_name}>
            {asset.size && filesize(asset.size)}
          </div>
          <div className={`${styles.field_name} ${isLoading && 'loadable'}`}>
            {format(new Date(asset.createdAt), dateFormat)}
          </div>
          {!isLoading && !isUploading &&
            <div>
              <AssetOptions
                asset={asset}
                openArchiveAsset={openArchiveAsset}
                openDeleteAsset={openDeleteAsset}
                openMoveAsset={openMoveAsset}
                realUrl={realUrl}
                downloadAsset={downloadAsset}
                openShareAsset={openShareAsset}
                openCopyAsset={openCopyAsset}
              />
            </div>
          }
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

export default ListItem