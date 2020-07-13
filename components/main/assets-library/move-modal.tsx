import styles from './move-modal.module.css'
import { useState } from 'react'
import { Assets } from '../../../assets'

// Components
import Base from '../../common/modals/base'
import Button from '../../common/buttons/button'
import IconClickable from '../../common/buttons/icon-clickable'

const MoveModal = ({ modalIsOpen, closeModal, folders, itemsAmount, moveAssets }) => {

  const [selectedFolder, setSelectedFolder] = useState()

  return (
    <Base
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      confirmText={'Move'}
      headText={`Move ${itemsAmount} items to...`}
      confirmAction={() => moveAssets(selectedFolder)} >
      <ul className={styles.list}>
        {folders.map(folder => (
          <li key={folder.id} onClick={() => setSelectedFolder(folder.id)}>
            <IconClickable src={Assets.folder} />
            <div>
              {folder.name}
            </div>
          </li>
        ))}
      </ul>
    </Base>)
}

export default MoveModal