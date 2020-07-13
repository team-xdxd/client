import styles from './asset-subheader.module.css'
import { useRef } from 'react'
import { Assets } from '../../../assets'


// Components
import SubHeader from '../../common/layouts/sub-header'
import SimpleButton from '../../common/buttons/simple-button'
import ToggleAbleAbsoluteWrapper from '../../common/misc/toggleable-absolute-wrapper'
import AssetHeaderOps from '../../common/asset/asset-header-ops'
import DriveSelector from '../../common/asset/drive-selector'

const AssetSubheader = ({
  onFilesDataGet,
  openFolderUploader,
  openDropboxSelector,
  onDriveFilesSelect,
  amountSelected = 0,
  setActiveModal,
  downloadSelected
}) => {

  const fileBrowserRef = useRef(undefined)

  const dropdownOptions = [
    {
      label: 'Add Folder',
      text: 'Orgnanized Files',
      onClick: openFolderUploader,
      icon: Assets.folder
    },
    {
      label: 'Upload',
      text: 'png, jpg, gif or mp4',
      onClick: () => fileBrowserRef.current.click(),
      icon: Assets.file
    },
    {
      label: 'Dropbox',
      text: 'Import files',
      onClick: openDropboxSelector,
      icon: Assets.file
    },
    {
      label: 'Google Drive',
      text: 'Import files',
      onClick: () => { },
      icon: Assets.file,
      CustomContent: ({ children }) => (
        <DriveSelector
          onFilesSelect={onDriveFilesSelect}
        >
          {children}
        </DriveSelector>
      )
    }
  ]

  const SimpleButtonWrapper = ({ children }) => (
    <div className={styles['button-wrapper']}>
      <SimpleButton text='+' />
      {children}
    </div>
  )

  const onFileChange = (e) => {
    onFilesDataGet(Array.from(e.target.files).map(originalFile => ({ originalFile })))
  }

  const DropDownOptions = () => {

    const Content = (option) => {
      return (
        <li className={styles.option}
          onClick={option.onClick}>
          <img src={option.icon} />
          <div className={styles['option-label']}>{option.label}</div>
          <div className={styles['option-text']}>{option.text}</div>
        </li>
      )
    }

    return (
      <ul className={styles['options-list']}>
        {dropdownOptions.map(option => (
          <>
            {option.CustomContent ?
              <option.CustomContent>
                <Content {...option} />
              </option.CustomContent>
              :
              <Content {...option} />
            }
          </>
        ))}
      </ul>
    )
  }

  return (
    <SubHeader pageTitle={'Asset Library'} additionalClass={styles['asset-subheader']}>
      <div className={styles.padding}>
      </div>
      {amountSelected > 0 ?
        <AssetHeaderOps
          onArchive={() => setActiveModal('archive')}
          onDelete={() => setActiveModal('delete')}
          onDownload={downloadSelected}
          onMove={() => setActiveModal('move')}
          onShare={() => setActiveModal('share')}
        />
        :
        <>
          <input multiple={true} id="file-input-id" ref={fileBrowserRef} style={{ display: 'none' }} type='file'
            onChange={onFileChange} />
          <ToggleAbleAbsoluteWrapper
            Wrapper={SimpleButtonWrapper}
            Content={DropDownOptions}
          />
        </>
      }
    </SubHeader>
  )
}

export default AssetSubheader
