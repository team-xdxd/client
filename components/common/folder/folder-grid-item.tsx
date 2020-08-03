import styles from './folder-grid-item.module.css'
import { Utilities, Assets } from '../../../assets'
import { useState } from 'react'
import zipDownloadUtils from '../../../utils/download'

// Components
import AssetImg from '../asset/asset-img'
import Button from '../buttons/button'
import FolderOptions from './folder-options'
import IconClickable from '../buttons/icon-clickable'
import ConfirmModal from '../modals/confirm-modal'

const FolderGridItem = ({
	id,
	name,
	size,
	length,
	assets,
	viewFolder,
	isLoading = false,
	deleteFolder,
	shareAssets = (folder) => { }
}) => {

	const previews = [1, 2, 3, 4]
		.map((_, index) => ({
			name: assets[index]?.name || 'empty',
			assetImg: assets[index]?.thumbailUrl || '',
			type: assets[index]?.type || 'empty'
		}))

	const [deleteOpen, setDeleteOpen] = useState(false)

	const downloadFoldercontents = () => {
		zipDownloadUtils.zipAndDownload(assets.map(assetItem => ({ url: assetItem.realUrl, name: assetItem.name })), name)
	}

	return (
		<div className={`${styles.container} ${isLoading && 'loadable'}`}>
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
					<FolderOptions
						downloadFoldercontents={downloadFoldercontents}
						setDeleteOpen={setDeleteOpen}
						shareAssets={shareAssets}
					/>
				</div>
			</div>
			<ConfirmModal
				closeModal={() => setDeleteOpen(false)}
				confirmAction={() => {
					deleteFolder()
					setDeleteOpen(false)
				}}
				confirmText={'Delete'}
				message={'Are you sure you want to delete this folder?'}
				modalIsOpen={deleteOpen}
			/>
		</div >
	)
}

export default FolderGridItem