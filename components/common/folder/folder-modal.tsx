import { capitalCase } from 'change-case'
import styles from './folder-modal.module.css'
import { useForm } from 'react-hook-form'

// Components
import Base from '../../common/modals/base'
import Input from '../../common/inputs/input'
import Button from '../../common/buttons/button'
import FormInput from '../../common/inputs/form-input'

const FolderModal = ({ modalIsOpen, closeModal, onSubmit }) => {

  const { control, handleSubmit, errors } = useForm()

  return (
    <Base
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
    >
      <div className={styles.folder_modal}>
        <div className={styles.close_modal} onClick={closeModal}>
          {/* <img src={GeneralImg.logo} /> */}
          <span className={styles.x}>X</span>
        </div>
        <div>
          <h2>Create Folder</h2>
        </div>
          <div className={styles.folder_modal_input}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              InputComponent={
                <Input
                  type='text'
                  placeholder='Name Your Folder'
                  styleType='regular'
                />
              }
              name='name'
              control={control}
              message={'This field should be between 1 and 30 characters long'}
              rules={{ minLength: 1, maxLength: 30, required: true }}
              errors={errors}
            />
          <div className={styles.buttons_container}>
            <div className={styles.cancel_button}>
              <Button
                text="Cancel"
                onClick={closeModal}
                type=""
                styleType='secondary'
                />
            </div>
            <Button
              text="Create"
              type="normal-height"
              styleType='primary'
            />
          </div>
        </form>
          
          </div>
          
      </div>
    </Base >
  )
}

export default FolderModal
