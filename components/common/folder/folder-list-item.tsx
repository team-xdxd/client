import styles from "./folder-list-item.module.css"
import { Utilities, Assets } from '../../../assets'
import { useState } from 'react'
import { format } from 'date-fns'
import zipDownloadUtils from '../../../utils/download'

// Components
import FolderOptions from './folder-options'
import ConfirmModal from '../modals/confirm-modal'

const FolderListItem = ({
	index,
	id,
	name,
	size,
	length,
	createdAt,
	assets,
	viewFolder,
	isLoading = false,
	deleteFolder = (id) => { }
}) => {

	const dateFormat = 'MMM do, yyyy h:mm a'

	const [deleteOpen, setDeleteOpen] = useState(false)

	const downloadFoldercontents = () => {
		zipDownloadUtils.zipAndDownload(assets.map(assetItem => ({ url: assetItem.realUrl, name: assetItem.name })), name)
	}

	return (
		<>
			<div className={styles.list}>
				{index === 0 &&
					<div className={styles.header}>
						<h4>Name</h4>
						<h4>Assets</h4>
						<h4>Created At</h4>
						<h4></h4>
					</div>
				}
				<div className={styles.item}>
					<div className={`${styles.name} ${isLoading && 'loadable'}`} onClick={viewFolder}>
						{name}
					</div>
					<div className={styles.field_name}>
						{!isLoading && `${length} Assets`}
					</div>
					<div className={`${styles.field_name} ${isLoading && 'loadable'}`}>
						{format(new Date(createdAt), dateFormat)}
					</div>
					{!isLoading &&
						<div>
							<FolderOptions
								downloadFoldercontents={downloadFoldercontents}
								setDeleteOpen={setDeleteOpen}
							/>
						</div>
					}
				</div>
			</div>
			<ConfirmModal
				closeModal={() => setDeleteOpen(false)}
				confirmAction={deleteFolder}
				confirmText={'Delete'}
				message={'Are you sure you want to delete this folder?'}
				modalIsOpen={deleteOpen}
			/>
		</>
	)
}

export default FolderListItem