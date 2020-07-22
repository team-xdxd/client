import styles from './asset-options.module.css'
import { Utilities } from '../../../assets'

// Components
import IconClickable from '../buttons/icon-clickable'
import Dropdown from '../inputs/dropdown'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'

const AssetOptions = ({
	realUrl,
	asset,
	openMoveAsset,
	openArchiveAsset,
	openDeleteAsset
}) => {

	const options = [
		{
			OverrideComp: () => (
				<li>
					<a href={realUrl} download={asset.name}>
						<span>
							Download
									</span>
					</a>
				</li>
			)
		},
		{ label: 'Comment', onClick: () => { } },
		{ label: 'Move', onClick: openMoveAsset },
		{ label: 'Archive', onClick: openArchiveAsset },
		{ label: 'Delete', onClick: openDeleteAsset }
	]

	const filteredOptions = options.filter(option => asset.stage !== 'archived' || (asset.stage === 'archived' && option.label !== 'Archive'))

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
						options={filteredOptions}
					/>
				</div>
			)}
		/>
	)
}

export default AssetOptions