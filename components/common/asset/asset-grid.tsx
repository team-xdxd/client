import styles from './asset-grid.module.css'
import useDropzone from '../misc/dropzone'
import update from 'immutability-helper'
import { useEffect, useContext, useState } from 'react'
import { AssetContext } from '../../../context'
import toastUtils from '../../../utils/toast'
import { Waypoint } from 'react-waypoint'
import downloadUtils from '../../../utils/download'
import assetsApi from '../../../server-api/asset'

// Components
import AssetAddition from './asset-addition'
import FolderGridItem from '../folder/folder-grid-item'
import FolderListItem from '../folder/folder-list-item'
import AssetThumbail from './asset-thumbail'
import ListItem from './list-item'
import AssetUpload from './asset-upload'
import ConfirmModal from '../modals/confirm-modal'
import Button from '../buttons/button'

const AssetGrid = ({ activeView = 'grid', onFilesDataGet, toggleSelected, mode = 'assets', activeSortFilter = {}, folders = [],
  deleteFolder = (id) => { },
  activeFolder = '',
  type = '',
  itemId = '',
  getFolders = () => { },
  loadMore = () => { },
  viewFolder = (id) => { } }) => {

  const isDragging = useDropzone()
  const { assets, setAssets, setActiveOperation, setOperationAsset, nextPage, setOperationFolder } = useContext(AssetContext)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [archiveModalOpen, setArchiveModalOpen] = useState(false)
  const [activeAssetId, setActiveAssetId] = useState('')

  const [activeSearchOverlay, setActiveSearchOverlay] = useState(false)

  const openArchiveAsset = id => {
    setActiveAssetId(id)
    setArchiveModalOpen(true)
  }

  const openDeleteAsset = id => {
    setActiveAssetId(id)
    setDeleteModalOpen(true)
  }

  const deleteAsset = async id => {
    try {
      await assetsApi.deleteAsset(id)
      const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === id)
      setAssets(update(assets, {
        $splice: [[assetIndex, 1]]
      }))
      toastUtils.success('Assets deleted successfully')
    }
    catch (err) {
      // TODO: Error handling
      toastUtils.error('Could not delete assets, please try again later.')
    }
  }

  const archiveAsset = async id => {
    try {
      await assetsApi.updateAsset(id, { updateData: { stage: 'archived' } })
      const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === id)
      setAssets(update(assets, {
        $splice: [[assetIndex, 1]]
      }))
      toastUtils.success('Assets archived successfully')
    }
    catch (err) {
      // TODO: Error handling
      toastUtils.error('Could not archive assets, please try again later.')
    }
  }

  const beginAssetOperation = ({ asset = null, folder = null }, operation) => {
    if (asset) setOperationAsset(asset)
    if (folder) setOperationFolder(folder)
    setActiveOperation(operation)
  }

  const downloadAsset = (assetItem) => {
    downloadUtils.downloadFile(assetItem.realUrl, assetItem.asset.name)
  }


  return (
    <section className={styles.container}>
      {(((mode === 'assets' && assets.length === 0) || (mode === 'folders' && folders.length === 0)) || isDragging) &&
        <AssetUpload
          onDragText={'Drop files here to upload'}
          preDragText={assets.length === 0 ? `Drag and drop your files here to upload (png, jpg, gif or mp4)` : ''}
          onFilesDataGet={onFilesDataGet} />
      }
      {(activeSearchOverlay || assets.length === 0) &&
        <AssetAddition
          displayMode='regular'
          folderAdd={false}
          activeFolder={activeFolder}
          getFolders={getFolders}
          type={type}
          itemId={itemId}
          activeSearchOverlay={activeSearchOverlay}
          setActiveSearchOverlay={setActiveSearchOverlay}
        />
      }
      <div className={styles['list-wrapper']}>
        {activeView === 'grid' &&
          <ul className={styles['grid-list']}>
            {mode === 'assets' && assets.map((assetItem, index) => {
              return (
                <li className={styles['grid-item']} key={assetItem.asset.id || index}>
                  <AssetThumbail
                    {...assetItem}
                    toggleSelected={() => toggleSelected(assetItem.asset.id)}
                    openArchiveAsset={() => openArchiveAsset(assetItem.asset.id)}
                    openDeleteAsset={() => openDeleteAsset(assetItem.asset.id)}
                    openMoveAsset={() => beginAssetOperation({ asset: assetItem }, 'move')}
                    openCopyAsset={() => beginAssetOperation({ asset: assetItem }, 'copy')}
                    openShareAsset={() => beginAssetOperation({ asset: assetItem }, 'share')}
                    downloadAsset={() => downloadAsset(assetItem)}
                  />
                </li>
              )
            })}

            {mode === 'folders' && folders.map((folder, index) => {
              return (
                <li className={styles['grid-item']} key={folder.id || index}>
                  <FolderGridItem {...folder}
                    viewFolder={() => viewFolder(folder.id)}
                    deleteFolder={() => deleteFolder(folder.id)}
                    shareAssets={() => beginAssetOperation({ folder }, 'share')} />
                </li>
              )
            })}
          </ul>
        }
        {activeView === 'list' &&
          <ul className={'regular-list'}>
            {mode === 'assets' && assets.map((assetItem, index) => {
              return (
                <li className={styles['regular-item']} key={assetItem.asset.id || index}>
                  <ListItem
                    assetItem={assetItem}
                    index={index}
                    toggleSelected={() => toggleSelected(assetItem.asset.id)}
                    openArchiveAsset={() => openArchiveAsset(assetItem.asset.id)}
                    openDeleteAsset={() => openDeleteAsset(assetItem.asset.id)}
                    openMoveAsset={() => beginAssetOperation({ asset: assetItem }, 'move')}
                    openCopyAsset={() => beginAssetOperation({ asset: assetItem }, 'copy')}
                    openShareAsset={() => beginAssetOperation({ asset: assetItem }, 'share')}
                    downloadAsset={() => downloadAsset(assetItem)}
                  />
                </li>
              )
            })}
            {mode === 'folders' && folders.map((folder, index) => {
              return (
                <li className={styles['grid-item']} key={folder.id || index}>
                  <FolderListItem {...folder}
                    viewFolder={() => viewFolder(folder.id)}
                    deleteFolder={() => deleteFolder(folder.id)} index={index}
                    shareAssets={() => beginAssetOperation({ folder }, 'share')} />
                </li>
              )
            })}
          </ul>
        }
        {(mode === 'assets' && assets.length > 0) && nextPage !== -1 &&
          <>
            {nextPage > 2 ?
              <>
                {!assets[assets.length - 1].isLoading &&
                  <Waypoint onEnter={loadMore} fireOnRapidScroll={false} />
                }
              </>

              :
              <>
                {!assets[assets.length - 1].isLoading &&
                  <div className={styles['button-wrapper']}>
                    <Button
                      text='Load More'
                      type='button'
                      styleType='primary'
                      onClick={loadMore} />
                  </div>
                }
              </>
            }
          </>
        }
      </div>

      {/* Delete modal */}
      <ConfirmModal
        closeModal={() => setDeleteModalOpen(false)}
        confirmAction={() => {
          deleteAsset(activeAssetId)
          setActiveAssetId('')
          setDeleteModalOpen(false)
        }}
        confirmText={'Delete'}
        message={
          <span>
            Are you sure you want to &nbsp;<strong>Delete</strong>&nbsp; this asset?
        </span>
        }
        modalIsOpen={deleteModalOpen}
      />

      {/* Archive modal */}
      <ConfirmModal
        closeModal={() => setArchiveModalOpen(false)}
        confirmAction={() => {
          archiveAsset(activeAssetId)
          setActiveAssetId('')
          setArchiveModalOpen(false)
        }}
        confirmText={'Archive'}
        message={
          <span>
            Are you sure you want to &nbsp;<strong>Archive</strong>&nbsp; this asset?
        </span>
        }
        modalIsOpen={archiveModalOpen}
      />
    </section >
  )
}

export default AssetGrid