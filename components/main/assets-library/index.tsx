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

  return (
    <>
      <AssetSubheader
        openFileUploader={() => setActiveModal('file')}
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
        <AssetList />
      </main>
    </>
  )
}

export default AssetsLibrary
