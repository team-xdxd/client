import styles from './index.module.css'
import { useEffect, useState } from 'react'
import assetApi from '../../server-api/asset'
import toastUtils from '../../utils/toast'

// Components
import ShareItem from './share-item'


const AssetShare = () => {

	const [assets, setAssets] = useState([])

	useEffect(() => {
		getAssets()
	}, [])

	const getAssets = async () => {
		try {
			const splitSearch = window.location.search?.split('shareJWT=')
			if (splitSearch[1]) {
				const { data } = await assetApi.getSharedAssets(splitSearch[1])
				setAssets(data)
			}
		} catch (err) {
			toastUtils.error('Could not get assets from server')
		}
	}

	return (
		<section className={styles.container}>
			<div className={styles['list-wrapper']}>
				<ul className={styles['grid-list']}>
					{assets.map((assetItem) => {
						return (
							<li className={styles['grid-item']} key={assetItem.asset.id}>
								<ShareItem {...assetItem} />
							</li>
						)
					})}
				</ul>
			</div>
		</section >
	)
}

export default AssetShare