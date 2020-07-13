import styles from './index.module.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { AssetContext } from '../../../context'
import { useForm } from 'react-hook-form'
import selectOptions from './select-options'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import assetApi from '../../../server-api/asset'
import folderApi from '../../../server-api/folder'
import cookiesUtils from '../../../utils/cookies'
import downloadUtils from '../../../utils/download'

// Components
import AssetSubheader from './asset-subheader'
import AssetGrid from '../../common/asset/asset-grid'
import TopBar from './top-bar'
import MoveModal from './move-modal'
import ConfirmModal from '../../common/modals/confirm-modal'
import FolderModal from './folder-modal'
import { DropzoneProvider } from '../../common/misc/dropzone'

const AssetsLibrary = () => {

  const [activeSortFilter, setActiveSortFilter] = useState({
    sort: selectOptions.sort[0],
    mainFilter: 'all',
    filterCampaigns: [],
    filterTags: []
  })
  const [activeView, setActiveView] = useState('grid')
  const { assets, setAssets } = useContext(AssetContext)
  const [activeModal, setActiveModal] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [activeMode, setActiveMode] = useState('assets')
  const [activeFolder, setActiveFolder] = useState('')
  const [folders, setFolders] = useState([])

  useEffect(() => {
    getFolders()
  }, [])

  useEffect(() => {
    if (activeSortFilter.mainFilter === 'folders') {
      setActiveMode('folders')
    } else {
      setActiveMode('assets')
      setAssets([])
      getAssets()
    }
  }, [activeSortFilter])

  useEffect(() => {
    setAssets([])
    getAssets()
  }, [activeFolder])

  const getAssets = async () => {
    try {
      const { data } = await assetApi.getAssets({ ...getFilters(), ...getSort() })
      setAssets(data.map(mapWithToggleSelection))
    } catch (err) {
      //TODO: Handle error
      console.log(err)
    }
  }

  const getFolders = async () => {
    try {
      const { data } = await folderApi.getFolders()
      setFolders(data)
    } catch (err) {
      //TODO: Handle error
      console.log(err)
    }
  }

  const getFilters = () => {
    const filters = {}
    const { mainFilter, filterCampaigns, filterTypes, filterTags } = activeSortFilter
    if (mainFilter !== 'all' && mainFilter !== 'folders') {
      if (mainFilter === 'images') filters.type = 'image'
      else if (mainFilter === 'videos') filters.type = 'video'
      else if (mainFilter === 'archived') filters.stage = 'archived'
    }

    if (filterCampaigns?.length > 0) {
      filters.campaigns = filterCampaigns.map(camp => camp.value).join(',')
    }

    if (filterTags?.length > 0) {
      filters.tags = filterTags.map(tag => tag.value).join(',')
    }

    if (activeFolder) {
      filters.folderId = activeFolder
    }
    return filters
  }

  const getSort = () => {
    if (activeSortFilter.sort.value !== 'none') {
      const { field, order } = activeSortFilter.sort
      return {
        sort: `${field},${order}`
      }
    } else return {}
  }

  const toggleSelected = (id) => {
    const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === id)
    setAssets(update(assets, {
      [assetIndex]: {
        isSelected: { $set: !assets[assetIndex].isSelected }
      }
    }))
  }

  const mapWithToggleSelection = asset => ({ ...asset, toggleSelected })

  const onFilesDataGet = async (files) => {
    const currentDataClone = [...assets]
    try {
      const formData = new FormData()
      const newPlaceholders = []
      files.forEach(file => {
        newPlaceholders.push({
          asset: {
            name: file.originalFile.name,
            createdAt: new Date()
          },
          isUploading: true
        })
        formData.append('asset', file.originalFile)
      })
      setAssets([...newPlaceholders, ...currentDataClone])
      const { data } = await assetApi.uploadAssets(formData)
      setAssets([...data, ...currentDataClone])
    } catch (err) {
      setAssets(currentDataClone)
      console.log(err)
      toastUtils.error('Could not upload files, please try again later.')
    }
  }

  const onDropboxFilesSelection = async (files) => {
    const currentDataClone = [...assets]
    try {
      const newPlaceholders = []
      files.forEach(file => {
        newPlaceholders.push({
          asset: {
            name: file.name,
            createdAt: new Date()
          },
          isUploading: true
        })
      })
      setAssets([...newPlaceholders, ...currentDataClone])
      const { data } = await assetApi.importAssets('dropbox', files.map(file => ({ link: file.link, name: file.name })))
      setAssets([...data, ...currentDataClone])
    } catch (err) {
      //TODO: Handle error
      setAssets(currentDataClone)
      console.log(err)
      toastUtils.error('Could not upload files, please try again later.')
    }
  }

  const onDriveFilesSelection = async (files) => {
    const googleAuthToken = cookiesUtils.get('gdriveToken')
    const currentDataClone = [...assets]
    try {
      const newPlaceholders = []
      files.forEach(file => {
        newPlaceholders.push({
          asset: {
            name: file.name,
            createdAt: new Date()
          },
          isUploading: true
        })
      })
      setAssets([...newPlaceholders, ...currentDataClone])
      const { data } = await assetApi.importAssets('drive', files.map(file => ({
        googleAuthToken,
        id: file.id,
        name: file.name,
        size: file.sizeBytes,
        mimeType: file.mimeType
      })))
      setAssets([...data, ...currentDataClone])
    } catch (err) {
      setAssets(currentDataClone)
      console.log(err)
      toastUtils.error('Could not upload files, please try again later.')
    }
  }

  const selectedAssets = assets.filter(asset => asset.isSelected)

  const onSubmit = async folderData => {
    try {
      await folderApi.createFolder(folderData)
      setActiveModal('')
    } catch (err) {
      // TODO: Show error message
      if (err.response?.data?.message) {
        setSubmitError(err.response.data.message)
      } else {
        setSubmitError('Something went wrong, please try again later')
      }
    }
  }

  const openDropboxSelector = (files) => {
    //png, jpg, gif or mp4
    const options = {
      success: onDropboxFilesSelection,
      linkType: 'direct',
      multiselect: true,
      extensions: ['.png', '.jpg', '.gif', '.mp4'],
      folderselect: false,
      sizeLimit: 50 * 1024 * 1024
    }
    // Ignore this annoying warning
    Dropbox.choose(options)
  }

  const moveAssets = async (selectedFolder) => {
    try {
      const updateAssets = selectedAssets.map(asset => (
        { id: asset.id, changes: { folderId: selectedFolder } }
      ))
      await assetApi.updateMultiple(updateAssets)
      setActiveFolder(selectedFolder)
    } catch (err) {
      console.log(err)
      toastUtils.error('Could not move assets, please try again later.')
    }
  }

  const archiveAssets = async () => {
    try {
      const updateAssets = selectedAssets.map(asset => (
        { id: asset.id, changes: { stage: 'archived' } }
      ))
      await assetApi.updateMultiple(updateAssets)
      getAssets()
    } catch (err) {
      console.log(err)
      toastUtils.error('Could not move assets, please try again later.')
    }
  }

  const deleteSelectedAssets = async () => {
    try {

    } catch (err) {
      console.log(err)
      toastUtils.error('Could not move assets, please try again later.')
    }
  }

  const downloadSelectedAssets = async () => {
    downloadUtils.zipAndDownload()
  }

  return (
    <>
      <AssetSubheader
        onFilesDataGet={onFilesDataGet}
        openFolderUploader={() => setActiveModal('folder')}
        amountSelected={selectedAssets.length}
        openDropboxSelector={openDropboxSelector}
        onDriveFilesSelect={onDriveFilesSelection}
        setActiveModal={setActiveModal}
        downloadSelected={downloadSelectedAssets}
      />
      <main className={`${styles.container}`}>
        <TopBar
          activeSortFilter={activeSortFilter}
          setActiveSortFilter={setActiveSortFilter}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <DropzoneProvider>
          <AssetGrid
            activeView={activeView}
            assets={assets}
            onFilesDataGet={onFilesDataGet}
            toggleSelected={toggleSelected}
            mode={activeMode}
            folders={folders}
          />
        </DropzoneProvider>
      </main>
      <FolderModal
        modalIsOpen={activeModal === 'folder'}
        closeModal={() => setActiveModal('')}
        onSubmit={onSubmit}
      />
      <MoveModal
        modalIsOpen={activeModal === 'move'}
        folders={folders}
        closeModal={() => setActiveModal('')}
        itemsAmount={selectedAssets.length}
        moveAssets={moveAssets}
      />
      <ConfirmModal
        modalIsOpen={activeModal === 'archive'}
        closeModal={() => setActiveModal('')}
        confirmAction={archiveAssets}
        confirmText={'Archive'}
        message={`Archive ${selectedAssets.length} items?`}
      />
      <ConfirmModal
        modalIsOpen={activeModal === 'delete'}
        closeModal={() => setActiveModal('')}
        confirmAction={deleteSelectedAssets}
        confirmText={'Delete'}
        message={`Delete ${selectedAssets.length} items?`}
      />
    </>
  )
}

export default AssetsLibrary
