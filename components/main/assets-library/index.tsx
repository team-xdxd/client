import styles from './index.module.css'
import { useState, useEffect, useContext } from 'react'
import { AssetContext } from '../../../context'
import selectOptions from './select-options'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import assetApi from '../../../server-api/asset'
import folderApi from '../../../server-api/folder'
import cookiesUtils from '../../../utils/cookies'

// Components
import AssetOps from '../../common/asset/asset-ops'
import SearchOverlay from '../search-overlay-assets'
import AssetSubheader from './asset-subheader'
import AssetGrid from '../../common/asset/asset-grid'
import TopBar from './top-bar'
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
  const { assets, setAssets, folders, setFolders } = useContext(AssetContext)
  const [activeModal, setActiveModal] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [activeMode, setActiveMode] = useState('assets')
  const [activeFolder, setActiveFolder] = useState('')

  const [activeSearchOverlay, setActiveSearchOverlay] = useState(false)

  const [firstLoaded, setFirstLoaded] = useState(false)

  useEffect(() => {
    if (activeSortFilter.mainFilter === 'folders') {
      setActiveMode('folders')
      getFolders()
    } else {
      setActiveMode('assets')
      setAssets([])
      getAssets()
    }
  }, [activeSortFilter])

  useEffect(() => {
    if (firstLoaded)
      setActiveSortFilter({
        ...activeSortFilter,
        mainFilter: 'all'
      })
  }, [activeFolder])

  const getAssets = async () => {
    try {
      const { data } = await assetApi.getAssets({ ...getFilters(), ...getSort() })
      setAssets(data.map(mapWithToggleSelection))
      setFirstLoaded(true)
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
    const { mainFilter, filterCampaigns, filterTags } = activeSortFilter
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
      getFolders()
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

  const viewFolder = async (id) => {
    setActiveFolder(id)
  }

  const updateFolder = async (name) => {
    try {
      await folderApi.updateFolder(activeFolder, { name })
      const modFolderIndex = folders.find(folder => folder.id === activeFolder)
      setFolders(update(folders, {
        [modFolderIndex]: {
          name: { $set: name }
        }
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const deleteFolder = async (id) => {
    try {
      await folderApi.deleteFolder(id)
      const modFolderIndex = folders.find(folder => folder.id === activeFolder)
      setFolders(update(folders, {
        $splice: [[modFolderIndex, 1]]
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const closeSearchOverlay = () => {
    getAssets()
    setActiveSearchOverlay(false)
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
        activeFolderData={activeFolder && folders.find(folder => folder.id === activeFolder)}
        setActiveFolder={setActiveFolder}
        updateFolder={updateFolder}
      />
      <main className={`${styles.container}`}>
        <TopBar
          activeSortFilter={activeSortFilter}
          setActiveSortFilter={setActiveSortFilter}
          activeView={activeView}
          setActiveView={setActiveView}
          activeFolder={activeFolder}
          setActiveSearchOverlay={() => setActiveSearchOverlay(true)}
        />
        <DropzoneProvider>
          <AssetGrid
            activeView={activeView}
            onFilesDataGet={onFilesDataGet}
            toggleSelected={toggleSelected}
            mode={activeMode}
            folders={folders}
            viewFolder={viewFolder}
            deleteFolder={deleteFolder}
          />
        </DropzoneProvider>
      </main>
      <FolderModal
        modalIsOpen={activeModal === 'folder'}
        closeModal={() => setActiveModal('')}
        onSubmit={onSubmit}
      />
      <AssetOps />

      {activeSearchOverlay &&
        <SearchOverlay
          closeOverlay={closeSearchOverlay}
        />
      }
    </>
  )
}

export default AssetsLibrary
