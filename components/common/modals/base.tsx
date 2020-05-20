import ReactModal from 'react-modal'
import styles from './base.module.css'

import { useEffect } from 'react'

ReactModal.defaultStyles = {}

// Used for the future
const Base = ({ modalIsOpen, children, closeModal }) => {

  return (
    <ReactModal
      isOpen={modalIsOpen}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
    >
      {children}
    </ReactModal>
  )
}

export default Base
