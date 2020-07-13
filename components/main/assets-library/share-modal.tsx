import styles from './share-modal.module.css'
import { useState } from 'react'
import { Assets } from '../../../assets'

// Components
import Base from '../../common/modals/base'
import Input from '../../common/inputs/input'
import IconClickable from '../../common/buttons/icon-clickable'

const ShareModal = ({ modalIsOpen, closeModal, itemsAmount, shareAssets }) => {

	const [recipients, setRecipients] = useState('')
	const [message, setMessage] = useState('')

	const closemoveModal = () => {
		setRecipients('')
		setMessage('')
		closeModal()
	}

	return (
		<Base
			modalIsOpen={modalIsOpen}
			closeModal={closemoveModal}
			confirmText={'Share'}
			headText={`Share ${itemsAmount} item(s)`}
			disabledConfirm={!recipients}
			confirmAction={() => {
				shareAssets(recipients, message)
				closemoveModal()
			}} >
			<div className={styles['input-wrapper']}>
				<Input placeholder={'Emails separated with comma'} onChange={e => setRecipients(e.target.value)} styleType={'regular-short'} />
			</div>
			<div className={styles['input-wrapper']}>
				<Input placeholder={'Add a message (optional)'} onChange={e => setMessage(e.target.value)} styleType={'regular-short'} />
			</div>
		</Base >)
}

export default ShareModal