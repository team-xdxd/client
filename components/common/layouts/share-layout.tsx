import styles from './share-layout.module.css'
import { GeneralImg, Navigation, Utilities } from '../../../assets'
import Router from 'next/router'

const AuthLayout = ({ children }) => {
	return (
		<>
			<header className={styles.header}>
				<img
					className={styles['logo-img']}
					src={GeneralImg.logo} />
			</header>
			{children}
			<footer className={styles.footer}>
			</footer>
		</>
	)
}

export default AuthLayout
