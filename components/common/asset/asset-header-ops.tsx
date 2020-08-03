import { useContext } from 'react'
import { AssetContext } from '../../../context'
import downloadUtils from '../../../utils/download'

// Components
import Button from '../../common/buttons/button'

const AssetHeaderOpts = () => {
	const {
		assets,
		setAssets,
		setActiveOperation
	} = useContext(AssetContext)

	const selectedAssets = assets.filter(asset => asset.isSelected)

	const downloadSelectedAssets = async () => {
		downloadUtils.zipAndDownload(selectedAssets.map(assetItem => ({ url: assetItem.realUrl, name: assetItem.asset.name })), 'assets')
	}

	const deselectAll = () => {
		setAssets(assets.map(asset => ({ ...asset, isSelected: false })))
	}
	return (
		<>
			<Button text={'Delete'} type='button' styleType='tertiary' onClick={() => setActiveOperation('delete')} />
			<Button text={'Archive'} type='button' styleType='tertiary' onClick={() => setActiveOperation('archive')} />
			<Button text={'Download'} type='button' styleType='tertiary' onClick={downloadSelectedAssets} />
			<Button text={'Move'} type='button' styleType='tertiary' onClick={() => setActiveOperation('move')} />
			<Button text={'Copy'} type='button' styleType='tertiary' onClick={() => setActiveOperation('copy')} />
			<Button text={'Share'} type='button' styleType='tertiary' onClick={() => setActiveOperation('share')} />
			<Button text={`Deselect All (${selectedAssets.length})`} type='button' styleType='primary' onClick={deselectAll} />
		</>
	)
}

export default AssetHeaderOpts