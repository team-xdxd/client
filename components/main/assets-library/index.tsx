import styles from './index.module.css'
import { useState, useEffect } from 'react'
import selectOptions from './select-options'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'

// Components
import AssetSubheader from './asset-subheader'
import AssetList from './asset-list'
import DetailOverlay from './detail-overlay'
import TopBar from './top-bar'
import MoveModal from './move-modal'
import FoldarModal from './folder-modal'

import assetApi from '../../../server-api/asset'

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

  const onFilesDataGet = async (files) => {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('asset', file.originalFile)
      })
      await assetApi.uploadAssets(formData)
    } catch (err) {

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
        <AssetList
          onFilesDataGet={onFilesDataGet}
        />
      </main>
      <FoldarModal
        modalIsOpen={activeModal === 'folder'}
        closeModal={() => setActiveModal('')}
      />
    </>
  )
}

export default AssetsLibrary
