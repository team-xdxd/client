import styles from './folder-grid-item.module.css'
import { Utilities, Assets } from '../../../assets'
import { useState } from 'react'

// Components
import AssetImg from '../asset/asset-img'
import Button from '../buttons/button'
import Dropdown from '../inputs/dropdown'
import IconClickable from '../buttons/icon-clickable'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import ConfirmModal from '../modals/confirm-modal'
import zipDownloadUtils from '../../../utils/download'

const FolderGridItem = ({
	id,
	name,
	size,
	length,
	assets,
	viewFolder,
	editFolder = (id) => { },
	archiveFolder = (id) => { },
	deleteFolder = (id) => { }
}) => {

	const previews = [1, 2, 3, 4]
		.map((_, index) => ({
			name: assets[index]?.name || 'empty',
			thumbailUrl: assets[index]?.thumbailUrl || '',
			type: assets[index]?.type || 'empty'
		}))

	const [deleteOpen, setDeleteOpen] = useState(false)

	const downloadFoldercontents = () => {
		zipDownloadUtils.zipAndDownload(assets.map(assetItem => ({ url: assetItem.realUrl, name: assetItem.name })), name)
	}

	return (
		<div className={styles.container}>
			<div className={styles['image-wrapper']}>
				<>
					{previews.map((preview) => (
						<div className={styles['sub-image-wrapper']}>
							<AssetImg {...preview} />
						</div>
					))}
					<div className={styles['image-button-wrapper']}>
						<Button styleType={'primary'} text={'View Folder'} type={'button'}
							onClick={viewFolder} />
					</div>
				</>
			</div>
			<div className={styles.info}>
				<div className='normal-text'>{name}</div>
				<div className={styles['details-wrapper']}>
					<div className='secondary-text'>{`${length} Assets`}</div>
					<ToggleableAbsoluteWrapper
						contentClass={styles['asset-actions']}
						wrapperClass={styles['asset-actions-wrapper']}
						Wrapper={({ children }) => (
							<>
								<IconClickable src={Utilities.moreLight} />
								{children}
							</>
						)}
						Content={() => (
							<div className={styles.more} >
								<Dropdown
									options={[
										// { label: 'Edit', onClick: editFolder },
										{ label: 'Download', onClick: downloadFoldercontents },
										// { label: 'Archive', onClick: archiveFolder },
										{ label: 'Delete', onClick: () => setDeleteOpen(true) }
									]}
								/>
							</div>
						)}
					/>
				</div>
			</div>
			<ConfirmModal
				closeModal={() => setDeleteOpen(false)}
				confirmAction={deleteFolder}
				confirmText={'Delete'}
				message={'Are you sure you want to delete this folder?'}
				modalIsOpen={deleteOpen}
			/>
		</div >
	)
}

export default FolderGridItem