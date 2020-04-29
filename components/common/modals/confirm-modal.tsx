import { capitalCase } from 'change-case'
import styles from './confirm-modal.module.css'

// Components
import Base from './base'
import Button from '../buttons/button'

// Used for the future
const ConfirmModal = ({ modalIsOpen, closeModal, message, confirmText, confirmAction }) => (
  <Base
    modalIsOpen={modalIsOpen}
    closeModal={closeModal}
  >
    <div className={styles.text}>
      <p>{message}</p>
      <span className={styles.close} onClick={closeModal}>x</span>
    </div>
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
        />
      </div>
    </div>
  </Base>
)

export default ConfirmModal
