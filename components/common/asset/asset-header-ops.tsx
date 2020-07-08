import { useContext } from 'react'
import { AssetContext } from '../../../context'

// Components
import Button from '../../common/buttons/button'

const AssetHeaderOpts = () => {
	const { assets, setAssets } = useContext(AssetContext)

	const selectedAssets = assets.filter(asset => asset.isSelected)
	const deselectAll = () => {
		setAssets(assets.map(asset => ({ ...asset, isSelected: false })))
	}
	return (
		<>
			<Button text={'Delete'} type='button' styleType='tertiary' />
			<Button text={'Archive'} type='button' styleType='tertiary' />
			<Button text={'Download'} type='button' styleType='tertiary' />
			<Button text={'Move'} type='button' styleType='tertiary' />
			<Button text={'Share'} type='button' styleType='tertiary' />
			<Button text={`Deselect All (${selectedAssets.length})`} type='button' styleType='primary' onClick={deselectAll} />
		</>
	)
}

export default AssetHeaderOpts