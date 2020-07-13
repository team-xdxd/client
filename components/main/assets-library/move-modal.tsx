import styles from './move-modal.module.css'
import { useState } from 'react'
import { Assets } from '../../../assets'

// Components
import Base from '../../common/modals/base'
import Button from '../../common/buttons/button'
import IconClickable from '../../common/buttons/icon-clickable'

const MoveModal = ({ modalIsOpen, closeModal, folders, itemsAmount, moveAssets }) => {

  const [selectedFolder, setSelectedFolder] = useState('')

  const closemoveModal = () => {
    setSelectedFolder('')
    closeModal()
  }

  return (
    <Base
      modalIsOpen={modalIsOpen}
      closeModal={closemoveModal}
      confirmText={'Move'}
      headText={`Move ${itemsAmount} items to...`}
      disabledConfirm={!selectedFolder}
      confirmAction={() => {
        moveAssets(selectedFolder)
        closemoveModal()
      }} >
      <ul className={styles.list}>
        {folders.map(folder => (
          <li key={folder.id} onClick={() => setSelectedFolder(folder.id)} className={selectedFolder === folder.id && styles.selected}>
            <IconClickable src={Assets.folder} />
            <div className={styles.name}>
              {folder.name}
            </div>
          </li>
        ))}
      </ul>
    </Base >)
}

export default MoveModal