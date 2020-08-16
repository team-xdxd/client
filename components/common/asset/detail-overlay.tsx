import styles from './detail-overlay.module.css'
import { Utilities } from '../../../assets'
import { saveAs } from 'file-saver'
import { useState, useEffect, useContext } from 'react'
import assetApi from '../../../server-api/asset'
import { AssetContext } from '../../../context'
import toastUtils from '../../../utils/toast'
import update from 'immutability-helper'
import downloadUtils from '../../../utils/download'

// Components
import SidePanel from './detail-side-panel'
import ConversationList from '../conversation/conversation-list'
import IconClickable from '../buttons/icon-clickable'
import Button from '../buttons/button'
import AssetImg from './asset-img'
import RenameModal from '../modals/rename-modal'

const DetailOverlay = ({ asset, realUrl, closeOverlay, openShareAsset = () => { }, openDeleteAsset = () => { }, isShare = false, initiaParams }) => {

  const [assetDetail, setAssetDetail] = useState()

  const [renameModalOpen, setRenameModalOpen] = useState(false)

  const [activeSideComponent, setActiveSidecomponent] = useState('detail')

  const { assets, setAssets } = useContext(AssetContext)

  useEffect(() => {
    getDetail()
    checkInitialParams()
  }, [])

  const checkInitialParams = () => {
    if (initiaParams.side) {
      setActiveSidecomponent(initiaParams.side)
    }
  }

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

  const updateAsset = async (updateData) => {
    try {
      const { data } = await assetApi.updateAsset(asset.id, updateData)
      setAssetDetail(data)
    } catch (err) {
      console.log(err)
    }
  }

  const confirmAssetRename = async (newValue) => {
    try {
      const editedName = `${newValue}.${assetDetail.extension}`
      await assetApi.updateAsset(asset.id, { updateData: { name: editedName } })
      const modAssetIndex = assets.findIndex(assetItem => assetItem.asset.id === asset.id)
      setAssets(update(assets, {
        [modAssetIndex]: {
          asset: {
            name: { $set: editedName }
          }
        }
      }))
      setAssetDetail(update(assetDetail,
        {
          name: { $set: editedName }
        }))
      toastUtils.success('Asset name updated')
    } catch (err) {
      console.log(err)
      toastUtils.error('Could not update asset name')
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
            <div className={styles.name}>
              <h3>
                {assetDetail.name}
              </h3>
              {!isShare && <IconClickable src={Utilities.edit} onClick={() => setRenameModalOpen(true)} />}
            </div>
            <div className={styles['asset-actions']}>
              {!isShare &&
                <Button text={'Share'} type={'button'} styleType={'primary'} onClick={openShareAsset} />
              }
              <Button text={'Download'} type={'button'} styleType={'secondary'} onClick={() => downloadUtils.downloadFile(realUrl, assetDetail.name)} />
            </div>
          </div>
          <div className={styles['img-wrapper']}>
            {assetDetail.type === 'image' &&
              <AssetImg name={assetDetail.name} assetImg={realUrl} />
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
      <section className={styles.side}>
        {assetDetail && activeSideComponent === 'detail' &&
          <SidePanel asset={assetDetail} updateAsset={updateAsset} isShare={isShare} />
        }
        {!isShare && activeSideComponent === 'comments' &&
          < ConversationList itemId={asset?.id} itemType='assets' />
        }
      </section>
      {!isShare &&
        <section className={styles.menu}>
          <IconClickable
            src={Utilities.delete}
            additionalClass={styles['menu-icon']}
            onClick={openDeleteAsset} />
          <div className={styles.separator}></div>
          <IconClickable
            src={Utilities.info}
            additionalClass={styles['menu-icon']}
            onClick={() => setActiveSidecomponent('detail')} />
          <IconClickable
            src={Utilities.comment}
            additionalClass={styles['menu-icon']}
            onClick={() => setActiveSidecomponent('comments')} />

        </section>
      }
      <RenameModal
        closeModal={() => setRenameModalOpen(false)}
        modalIsOpen={renameModalOpen}
        renameConfirm={confirmAssetRename}
        type={'Asset'}
        initialValue={assetDetail?.name.substring(0, assetDetail.name.lastIndexOf('.'))}
      />
    </div>
  )
}

export default DetailOverlay