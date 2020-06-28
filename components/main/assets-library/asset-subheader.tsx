import styles from './asset-subheader.module.css'
import { ProjectTypes } from '../../../assets'
import { useRef } from 'react'
import { Assets, Utilities } from '../../../assets'
import { useDropzone } from 'react-dropzone'

// Components
import SubHeader from '../../common/layouts/sub-header'
import SimpleButton from '../../common/buttons/simple-button'
import ToggleAbleAbsoluteWrapper from '../../common/misc/toggleable-absolute-wrapper'

const AssetSubheader = ({ onFilesDataGet, openFolderUploader }) => {

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
          <Content {...option} />
        ))}
      </ul>
    )
  }

  return (
    <SubHeader pageTitle={'Asset Library'} >
      <div className={styles.padding}>
      </div>
      <input multiple={true} id="file-input-id" ref={fileBrowserRef} style={{ display: 'none' }} type='file'
        onChange={onFileChange} />
      <ToggleAbleAbsoluteWrapper
        Wrapper={SimpleButtonWrapper}
        Content={DropDownOptions}
      />

    </SubHeader>
  )
}

export default AssetSubheader
