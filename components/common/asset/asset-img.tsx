import styles from './asset-img.module.css'

import { Assets } from "../../../assets"
import { useState } from 'react'

const AssetImg = ({ assetImg, type = 'image', name, opaque = false }) => {

	const [loaded, setLoaded] = useState(false)

	let finalImg = assetImg
	if (!finalImg && type === 'video') finalImg = Assets.videoThumbnail

	if (!finalImg) finalImg = Assets.empty
	return (
		<>
			<img src={Assets.empty} alt={'blank'} style={loaded ? { display: "none" } : {}} />
			<img src={finalImg} alt={name} className={`${styles.asset} ${opaque && styles.opaque}`} onLoad={() => setLoaded(true)} style={loaded ? {} : {
				opacity: 0,
				overflow: 'hidden',
				height: 0,
				width: 0,
				margin: 0,
				padding: 0,
				border: 'none'
			}} />
		</>
	)
}

export default AssetImg