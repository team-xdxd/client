import { capitalCase } from 'change-case'
import styles from './folder-modal.module.css'

// Components
import Base from '../../common/modals/base'

// Used for the future
const FolderModal = ({ modalIsOpen, closeModal }) => (
  <Base
    modalIsOpen={modalIsOpen}
    closeModal={closeModal}
  >
    <div>Folder stuff</div>
  </Base >
)

export default FolderModal
