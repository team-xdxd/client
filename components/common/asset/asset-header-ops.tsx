import { useContext } from 'react'
import { AssetContext } from '../../../context'

// Components
import Button from '../../common/buttons/button'

const AssetHeaderOpts = ({
	onDelete,
	onArchive,
	onDownload,
	onMove,
	onShare
}) => {
	const { assets, setAssets } = useContext(AssetContext)

	const selectedAssets = assets.filter(asset => asset.isSelected)
	const deselectAll = () => {
		setAssets(assets.map(asset => ({ ...asset, isSelected: false })))
	}
	return (
		<>
			<Button text={'Delete'} type='button' styleType='tertiary' onClick={onDelete} />
			<Button text={'Archive'} type='button' styleType='tertiary' onClick={onArchive} />
			<Button text={'Download'} type='button' styleType='tertiary' onClick={onDownload} />
			<Button text={'Move'} type='button' styleType='tertiary' onClick={onMove} />
			<Button text={'Share'} type='button' styleType='tertiary' onClick={onShare} />
			<Button text={`Deselect All (${selectedAssets.length})`} type='button' styleType='primary' onClick={deselectAll} />
		</>
	)
}

export default AssetHeaderOpts