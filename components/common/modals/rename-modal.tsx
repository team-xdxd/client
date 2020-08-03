import styles from './share-modal.module.css'
import { useState, useEffect } from 'react'

// Components
import Base from '../../common/modals/base'
import Input from '../../common/inputs/input'

const RenameModal = ({ modalIsOpen, closeModal, type, renameConfirm, initialValue = '' }) => {

    const [renameInput, setRenameInput] = useState('')

    useEffect(() => {
        if (initialValue) {
            setRenameInput(initialValue)
        }
    }, [modalIsOpen, initialValue])

    return (
        <Base
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            confirmText={'Rename'}
            headText={`Rename ${type}`}
            disabledConfirm={!renameInput}
            confirmAction={() => {
                renameConfirm(renameInput)
                closeModal()
            }} >
            <div className={styles['input-wrapper']}>
                <Input placeholder={'Enter name'} onChange={e => setRenameInput(e.target.value)} value={renameInput} styleType={'regular-short'} />
            </div>
        </Base >
    )
}

export default RenameModal