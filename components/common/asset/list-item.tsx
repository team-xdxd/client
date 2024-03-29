import asset from "../../../server-api/asset"
import styles from "./list-item.module.css"
import { Utilities, Assets } from '../../../assets'
import filesize from 'filesize'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { getParsedExtension } from '../../../utils/asset'

import StatusBadge from '../../common/misc/status-badge'

// Components
import AssetImg from './asset-img'
import AssetApplication from './asset-application'
import AssetText from './asset-text'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'
import DetailOverlay from './detail-overlay'
import AssetOptions from './asset-options'

const DEFAULT_DETAIL_PROPS = { visible: false, side: 'detail' }

const ListItem = ({
  type,
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
  downloadAsset = () => { },
  openRemoveAsset = () => { }
}) => {

  const dateFormat = 'MMM do, yyyy h:mm a'

  const [overlayProperties, setOverlayProperties] = useState(DEFAULT_DETAIL_PROPS)

  useEffect(() => {
    if (overlayProperties.visible) {
      document.body.classList.add('no-overflow')
    } else {
      document.body.classList.remove('no-overflow')
    }

    return () => document.body.classList.remove('no-overflow')
  }, [overlayProperties.visible])

  const openComments = () => {
    setOverlayProperties({ visible: true, side: 'comments' })
  }

  return (
    <>
      <div className={styles.list}>
        {index === 0 &&
          <div className={styles.header}>

            <h4> </h4>
            <div className={styles['headers-content']}>
              <h4>Name</h4>
              <h4>Stage</h4>
              <h4>Type</h4>
              <h4>Extension</h4>
              <h4>Size</h4>
              <h4>Created At</h4>
              <h4></h4>
            </div>
          </div>
        }
        <div className={styles.item}>
          <div className={styles.photo}>
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
              {asset.type === 'application' && <AssetApplication extension={asset.extension} onList={true} />}
              {asset.type === 'text' && <AssetText extension={asset.extension} onList={true} />}
            </div>
          </div>
          <div className={styles.info}>
            <div className={`${styles.name} ${isLoading && 'loadable'}`} onClick={() => setOverlayProperties({ ...DEFAULT_DETAIL_PROPS, visible: !overlayProperties.visible })}>
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
              {!isLoading && getParsedExtension(asset.extension)}
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
                  itemType={type}
                  asset={asset}
                  openArchiveAsset={openArchiveAsset}
                  openDeleteAsset={openDeleteAsset}
                  openMoveAsset={openMoveAsset}
                  realUrl={realUrl}
                  downloadAsset={downloadAsset}
                  openShareAsset={openShareAsset}
                  openCopyAsset={openCopyAsset}
                  openComments={openComments}
                />
              </div>
            }
          </div>
        </div>
      </div>
      {overlayProperties.visible &&
        <DetailOverlay
          asset={asset}
          realUrl={realUrl}
          initiaParams={overlayProperties}
          openShareAsset={openShareAsset}
          openDeleteAsset={openDeleteAsset}
          closeOverlay={() => setOverlayProperties({ ...DEFAULT_DETAIL_PROPS, visible: false })} />
      }
    </>
  )
}

export default ListItem