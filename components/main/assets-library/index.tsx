import styles from './index.module.css'
import { useState, useEffect, useContext } from 'react'
import { AssetContext } from '../../../context'
import selectOptions from './select-options'
import update from 'immutability-helper'
import assetApi from '../../../server-api/asset'
import folderApi from '../../../server-api/folder'
import toastUtils from '../../../utils/toast'

// Components
import AssetOps from '../../common/asset/asset-ops'
import SearchOverlay from '../search-overlay-assets'
import AssetSubheader from './asset-subheader'
import AssetGrid from '../../common/asset/asset-grid'
import TopBar from './top-bar'
import { DropzoneProvider } from '../../common/misc/dropzone'
import RenameModal from '../../common/modals/rename-modal'

const AssetsLibrary = () => {

  const [activeSortFilter, setActiveSortFilter] = useState({
    sort: selectOptions.sort[1],
    mainFilter: 'all',
    filterCampaigns: [],
    filterChannels: [],
    filterTags: []
  })
  const [activeView, setActiveView] = useState('grid')
  const {
    assets,
    setAssets,
    folders,
    setFolders,
    setPlaceHolders,
    nextPage,
    activeFolder,
    setActiveFolder,
    setActivePageMode,
    needsFetch,
    setNeedsFetch,
    addedIds,
    setAddedIds
  } = useContext(AssetContext)
  const [activeMode, setActiveMode] = useState('assets')

  const [activeSearchOverlay, setActiveSearchOverlay] = useState(false)

  const [firstLoaded, setFirstLoaded] = useState(false)

  const [renameModalOpen, setRenameModalOpen] = useState(false)

  useEffect(() => {
    setActivePageMode('library')
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
    if (firstLoaded && activeFolder !== '')
      setActiveSortFilter({
        ...activeSortFilter,
        mainFilter: 'all'
      })
  }, [activeFolder])

  useEffect(() => {
    if (needsFetch === 'assets') {
      getAssets()
    } else if (needsFetch === 'folders') {
      getFolders()
    }
    setNeedsFetch('')
  }, [needsFetch])

  const onFilesDataGet = async (files) => {
    const currentDataClone = [...assets]
    try {
      const formData = new FormData()
      const newPlaceholders = []
      files.forEach(file => {
        let { originalFile } = file
        newPlaceholders.push({
          asset: {
            name: originalFile.name,
            createdAt: new Date(),
            size: originalFile.size,
            stage: 'draft',
            type: 'image'
          },
          isUploading: true
        })
        const { path, type, size } = originalFile
        if (path.includes('/')) {
          originalFile = new File([originalFile.slice(0, size, type)],
            path.substring(1, path.length)
            , { type })
        }
        formData.append('asset', originalFile)
      })
      setAssets([...newPlaceholders, ...currentDataClone])
      const { data } = await assetApi.uploadAssets(formData, getCreationParameters())
      if (activeMode === 'folders') {
        setNeedsFetch('folders')
      } else {
        setAddedIds(data.map(assetItem => assetItem.asset.id))
        setAssets([...data, ...currentDataClone])
      }
      toastUtils.success(`${data.length} Asset(s) uploaded.`)
    } catch (err) {
      setAssets(currentDataClone)
      console.log(err)
      if (err.response?.status === 402) toastUtils.error(err.response.data.message)
      else toastUtils.error('Could not upload assets, please try again later.')
    }
  }

  const getCreationParameters = () => {
    const queryData = {}
    if (activeFolder) {
      queryData.folderId = activeFolder
    }

    return queryData
  }

  const getAssets = async (replace = true) => {
    try {
      if (replace) {
        setAddedIds([])
      }
      setPlaceHolders('asset', replace)
      // await new Promise((resolve) => setTimeout(resolve, 2500))
      const { data } = await assetApi.getAssets({ ...getFilters(replace), ...getSort() })
      setAssets({ ...data, results: data.results.map(mapWithToggleSelection) }, replace)
      setFirstLoaded(true)
    } catch (err) {
      //TODO: Handle error
      console.log(err)
    }
  }

  const getFolders = async () => {
    try {
      setPlaceHolders('folder')
      const { data } = await folderApi.getFolders()
      setFolders(data)
    } catch (err) {
      //TODO: Handle error
      console.log(err)
    }
  }

  const getFilters = (replace) => {
    const filters = {}
    const { mainFilter, filterCampaigns, filterTags, filterChannels } = activeSortFilter
    if (mainFilter !== 'folders') {
      if (mainFilter === 'images') {
        filters.type = 'image'
        filters.stage = 'draft'
      }
      else if (mainFilter === 'videos') {
        filters.type = 'video'
        filters.stage = 'draft'
      }
      else if (mainFilter === 'archived') filters.stage = 'archived'
      else filters.stage = 'draft'
    }

    if (filterCampaigns?.length > 0) {
      filters.campaigns = filterCampaigns.map(camp => camp.value).join(',')
    }

    if (filterChannels?.length > 0) {
      filters.channels = filterChannels.map(channel => channel.value).join(',')
    }

    if (filterTags?.length > 0) {
      filters.tags = filterTags.map(tag => tag.value).join(',')
    }

    if (activeFolder) {
      filters.folderId = activeFolder
    }

    if (!replace && addedIds.length > 0) {
      filters.excludeIds = addedIds.join(',')
    }

    filters.page = replace ? 1 : nextPage
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

  const selectAll = () => {
    setAssets(assets.map(assetItem => ({ ...assetItem, isSelected: true })))
  }

  const mapWithToggleSelection = asset => ({ ...asset, toggleSelected })

  const backToFolders = () => {
    setActiveFolder('')
    setActiveSortFilter({
      ...activeSortFilter,
      mainFilter: 'folders'
    })
  }

  const selectedAssets = assets.filter(asset => asset.isSelected)

  const viewFolder = async (id) => {
    setActiveFolder(id)
  }

  const deleteFolder = async (id) => {
    try {
      await folderApi.deleteFolder(id)
      const modFolderIndex = folders.findIndex(folder => folder.id === id)
      setFolders(update(folders, {
        $splice: [[modFolderIndex, 1]]
      }))
      toastUtils.success('Folder deleted successfully')
    } catch (err) {
      console.log(err)
    }
  }

  const closeSearchOverlay = () => {
    getAssets()
    setActiveSearchOverlay(false)
  }

  const confirmFolderRename = async (newValue) => {
    try {
      await folderApi.updateFolder(activeFolder, { name: newValue })
      const modFolderIndex = folders.findIndex(folder => folder.id === activeFolder)
      setFolders(update(folders, {
        [modFolderIndex]: {
          name: { $set: newValue }
        }
      }))
      toastUtils.success('Folder name updated')
    } catch (err) {
      console.log(err)
      toastUtils.error('Could not update folder name')
    }
  }

  return (
    <>
      <AssetSubheader
        activeFolder={activeFolder}
        getFolders={getFolders}
        amountSelected={selectedAssets.length}
        activeFolderData={activeFolder && folders.find(folder => folder.id === activeFolder)}
        backToFolders={backToFolders}
        setRenameModalOpen={setRenameModalOpen}
        activeSortFilter={activeSortFilter}
      />
      <main className={`${styles.container}`}>
        <TopBar
          activeSortFilter={activeSortFilter}
          setActiveSortFilter={setActiveSortFilter}
          activeView={activeView}
          setActiveView={setActiveView}
          activeFolder={activeFolder}
          setActiveSearchOverlay={() => setActiveSearchOverlay(true)}
          selectAll={selectAll}
        />
        <DropzoneProvider>
          <AssetGrid
            activeFolder={activeFolder}
            getFolders={getFolders}
            activeView={activeView}
            activeSortFilter={activeSortFilter}
            onFilesDataGet={onFilesDataGet}
            toggleSelected={toggleSelected}
            mode={activeMode}
            folders={folders}
            viewFolder={viewFolder}
            deleteFolder={deleteFolder}
            loadMore={() => getAssets(false)}
          />
        </DropzoneProvider>
      </main>
      <AssetOps />
      <RenameModal
        closeModal={() => setRenameModalOpen(false)}
        modalIsOpen={renameModalOpen}
        renameConfirm={confirmFolderRename}
        type={'Folder'}
        initialValue={activeFolder && folders.find(folder => folder.id === activeFolder).name}
      />
      {activeSearchOverlay &&
        <SearchOverlay
          closeOverlay={closeSearchOverlay}
        />
      }
    </>
  )
}

export default AssetsLibrary
