import styles from './share-layout.module.css'
import { GeneralImg, Navigation, Utilities } from '../../../assets'
import AssetContextProvider from '../../../context/asset-provider'

const ShareLayout = ({ children }) => {
	return (
		<>
			<AssetContextProvider>
				<header className={styles.header}>
					<img
						className={styles['logo-img']}
						src={GeneralImg.logo} />
				</header>
				{children}
				<footer className={styles.footer}>
				</footer>
			</AssetContextProvider>
		</>
	)
}

export default ShareLayout
