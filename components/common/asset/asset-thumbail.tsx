import styles from './asset-thumbail.module.css'
import { Utilities } from '../../../assets'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import assetApi from '../../../server-api/asset'

// Components
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'
import DetailOverlay from './detail-overlay'
import Dropdown from '../inputs/dropdown'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'

const AssetThumbail = ({
  asset,
  thumbailUrl,
  isUploading,
  isSelected = false,
  toggleSelected = (id) => { },
  openDeleteAsset = (id) => { },
  openMoveAsset = (id) => { },
  openArchiveAsset = (id) => { },
}) => {

  const [visibleOverlay, setVisibleOVerlay] = useState(false)

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
            <ToggleableAbsoluteWrapper
              contentClass={styles['asset-actions']}
              wrapperClass={styles['asset-actions-wrapper']}
              Wrapper={({ children }) => (
                <>
                  <IconClickable src={Utilities.moreLight} />
                  {children}
                </>
              )}
              Content={() => (
                <div className={styles.more} >
                  <Dropdown
                    options={[
                      {
                        OverrideComp: () => (
                          <li>
                            <a href={realUrl} download={asset.name}>
                              <span>
                                Download
                            </span>
                            </a>
                          </li>
                        )
                      },
                      { label: 'Comment', onClick: () => { } },
                      { label: 'Move', onClick: openMoveAsset },
                      { label: 'Archive', onClick: openArchiveAsset },
                      { label: 'Delete', onClick: openDeleteAsset }
                    ]}
                  />
                </div>
              )}
            />

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