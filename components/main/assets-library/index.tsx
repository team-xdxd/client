import styles from './index.module.css'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import selectOptions from './select-options'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'
import assetApi from '../../../server-api/asset'
import folderApi from '../../../server-api/folder'

// Components
import AssetSubheader from './asset-subheader'
import AssetGrid from '../../common/asset/asset-grid'
import TopBar from './top-bar'
import MoveModal from './move-modal'
import FolderModal from './folder-modal'
import { DropzoneProvider } from '../../common/misc/dropzone'



const AssetsLibrary = () => {

  const [activeFilter, setActiveFilter] = useState('all')
  const [activeView, setActiveView] = useState('grid')
  const [activeSort, setActiveSort] = useState(selectOptions.sort[0])
  const [additionalFilters, setAdditinalFilters] = useState({
    campaigns: [],
    type: [],
    tags: []
  })

  const [activeModal, setActiveModal] = useState('')
  const [fileDragged, isFileDragged] = useState(false)
  const [assets, setAssets] = useState([])
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    getAssets()
  }, [])

  const getAssets = async () => {
    try {
      const { data } = await assetApi.getAssets()
      setAssets(data)
    } catch (err) {
      //TODO: Handle error
      console.log(err)
    }
  }

  const onFilesDataGet = async (files) => {
    try {
      const formData = new FormData()
      const currentDataClone = [...assets]
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
      //TODO: Handle error
      console.log(err)
    }
  }

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

  return (
    <>
      <AssetSubheader
        onFilesDataGet={onFilesDataGet}
        openFolderUploader={() => setActiveModal('folder')}

      />
      <main className={`${styles.container}`}>
        <TopBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeView={activeView}
          setActiveView={setActiveView}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          additionalFilters={additionalFilters}
          setAdditinalFilters={setAdditinalFilters}
        />
        <DropzoneProvider>
          <AssetGrid
            activeView={activeView}
            assets={assets}
            onFilesDataGet={onFilesDataGet}
          />
        </DropzoneProvider>
      </main>
      <FolderModal
        modalIsOpen={activeModal === 'folder'}
        closeModal={() => setActiveModal('')}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default AssetsLibrary
