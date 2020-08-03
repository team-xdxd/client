import styles from './asset-subheader.module.css'
import { useState } from 'react'

// Components
import SubHeader from '../../common/layouts/sub-header'
import AssetHeaderOps from '../../common/asset/asset-header-ops'
import AssetAddition from '../../common/asset/asset-addition'

const AssetSubheader = ({
  amountSelected = 0,
  backToFolders,
  activeFolderData,
  activeFolder,
  setRenameModalOpen,
  getFolders
}) => {

  return (
    <SubHeader pageTitle={activeFolderData ? activeFolderData.name : 'Asset Library'} additionalClass={styles['asset-subheader']}
      editable={activeFolderData} onAltEditionClick={() => setRenameModalOpen(true)} altEditionAction={true}
      PreComponent={activeFolderData ? () => (
        <div className={styles['additional-folder-wrapper']}>
          <div className={styles.back} onClick={backToFolders}>
            {'<'}
          </div>
          <h4>Folder</h4>
        </div>
      ) : null}
    >
      <div className={styles.padding}>
      </div>
      {amountSelected > 0 ?
        <AssetHeaderOps />
        :
        <AssetAddition activeFolder={activeFolder} getFolders={getFolders} />
      }
    </SubHeader>
  )
}

export default AssetSubheader
