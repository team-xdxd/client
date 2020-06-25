import styles from './asset-subheader.module.css'
import { ProjectTypes } from '../../../assets'
import { useState } from 'react'
import { Assets } from '../../../assets'

// Components
import SubHeader from '../../common/layouts/sub-header'
import NavDropdownButton from '../../common/buttons/nav-dropdown-button'

const AssetSubheader = ({ openFileUploader, openFolderUploader }) => {  

  const dropdownOptions = [
    {
      label: 'Folder',
      onClick: openFolderUploader,
      icon: Assets.folder
    },
    {
      label: 'Upload',
      onClick: openFileUploader,
      icon: Assets.file
    }
  ]

  return (
    <SubHeader pageTitle={'Asset Library'} >
      <div className={styles.padding}>
      </div>
      <NavDropdownButton
        text='Add New'
        options={dropdownOptions}
      />
    </SubHeader>
  )
}

export default AssetSubheader
