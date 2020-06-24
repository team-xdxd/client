import styles from './index.module.css'
import { useState, useEffect } from 'react'

import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'

// Components
import AssetSubheader from './asset-subheader'
import AssetGrid from './asset-grid'
import DetailOverlay from './detail-overlay'
import TopBar from './top-bar'
import MoveModal from './move-modal'

const AssetsLibrary = () => {

  return (
    <>
      <AssetSubheader />
      <main className={`${styles.container}`}>
        <TopBar />
        <AssetGrid />
      </main>
    </>
  )
}

export default AssetsLibrary
