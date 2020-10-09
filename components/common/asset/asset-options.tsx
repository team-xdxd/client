import styles from './asset-options.module.css'
import { Utilities } from '../../../assets'

import { ASSET_DOWNLOAD } from '../../../constants/permissions'

// Components
import IconClickable from '../buttons/icon-clickable'
import Dropdown from '../inputs/dropdown'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'

const AssetOptions = ({
	realUrl,
	itemType = '',
	asset,
	downloadAsset,
	openMoveAsset,
	openCopyAsset,
	openArchiveAsset,
	openDeleteAsset,
	openShareAsset,
	openComments,
	openRemoveAsset
}) => {
	// onClick={() => downloadUtils.downloadFile(realUrl, assetDetail.name)}
	const options = [
		{ label: 'Download', onClick: downloadAsset, permissions: [ASSET_DOWNLOAD] },
		{ label: 'Comment', onClick: openComments },
		{ label: 'Move', onClick: openMoveAsset },
		{ label: 'Copy', onClick: openCopyAsset },
		{ label: asset.stage !== 'archived' ? 'Archive' : 'Unarchive', onClick: openArchiveAsset },
		{ label: 'Delete', onClick: openDeleteAsset },
		{ label: 'Share', onClick: openShareAsset }
	]

	if (itemType) {
		options.push({ label: 'Remove', onClick: openRemoveAsset })
	}

	return (
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
						options={options}
					/>
				</div>
			)}
		/>
	)
}

export default AssetOptions