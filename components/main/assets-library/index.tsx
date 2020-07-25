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

const AssetsLibrary = () => {

  const [activeSortFilter, setActiveSortFilter] = useState({
    sort: selectOptions.sort[0],
    mainFilter: 'all',
    filterCampaigns: [],
    filterTags: []
  })
  const [activeView, setActiveView] = useState('grid')
  const { assets, setAssets, folders, setFolders, setPlaceHolders } = useContext(AssetContext)
  const [activeMode, setActiveMode] = useState('assets')
  const [activeFolder, setActiveFolder] = useState('')

  const [activeSearchOverlay, setActiveSearchOverlay] = useState(false)

  const [firstLoaded, setFirstLoaded] = useState(false)

  const onFilesDataGet = async (files) => {
    const currentDataClone = [...assets]
    try {
      const formData = new FormData()
      const newPlaceholders = []
      files.forEach(file => {
        newPlaceholders.push({
          asset: {
            name: file.originalFile.name,
            createdAt: new Date(),
            size: file.originalFile.size,
            stage: 'draft'
          },
          isUploading: true
        })
        formData.append('asset', file.originalFile)
      })
      setAssets([...newPlaceholders, ...currentDataClone])
      const { data } = await assetApi.uploadAssets(formData, getCreationParameters())
      setAssets([...data, ...currentDataClone])
    } catch (err) {
      setAssets(currentDataClone)
      console.log(err)
      toastUtils.error('Could not upload files, please try again later.')
    }
  }

  const getCreationParameters = () => {
    const queryData = {}
    if (activeFolder) {
      queryData.folderId = activeFolder
    }

    return queryData
  }

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
    if (firstLoaded && activeFolder !== '')
      setActiveSortFilter({
        ...activeSortFilter,
        mainFilter: 'all'
      })
  }, [activeFolder])

  const getAssets = async () => {
    try {
      setPlaceHolders('asset')
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
      setPlaceHolders('folder')
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
        activeFolder={activeFolder}
        getFolders={getFolders}
        amountSelected={selectedAssets.length}
        activeFolderData={activeFolder && folders.find(folder => folder.id === activeFolder)}
        backToFolders={backToFolders}
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
            activeSortFilter={activeSortFilter}
            onFilesDataGet={onFilesDataGet}
            toggleSelected={toggleSelected}
            mode={activeMode}
            folders={folders}
            viewFolder={viewFolder}
            deleteFolder={deleteFolder}
          />
        </DropzoneProvider>
      </main>
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
