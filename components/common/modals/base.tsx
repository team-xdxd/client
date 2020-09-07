import ReactModal from 'react-modal'
import styles from './base.module.css'

import { useEffect } from 'react'

// Components
import Button from '../buttons/button'

ReactModal.defaultStyles = {}

// Used for the future
const Base = ({ modalIsOpen, children, closeModal, confirmAction = () => { }, confirmText = '', headText = '', disabledConfirm = false, noHeightMax = false }) => {

  return (
    <ReactModal
      isOpen={modalIsOpen}
      className={`${styles.modal} ${noHeightMax && styles['no-height-max']}`}
      overlayClassName={styles.overlay}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
    >
      {headText &&
        <div className={styles.text}>
          <p>{headText}</p>
          <span className={styles.close} onClick={closeModal}>x</span>
        </div>
      }
      {children}
      {confirmText &&
        <div className={styles.buttons}>
          <div>
            <Button
              text='Cancel'
              onClick={closeModal}
              type='button'
              styleType='secondary'
            />
          </div>
          <div>
            <Button
              text={confirmText}
              onClick={confirmAction}
              type='button'
              styleType='primary'
              disabled={disabledConfirm}
            />
          </div>
        </div>
      }
    </ReactModal>
  )
}

export default Base
