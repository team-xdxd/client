import styles from './folder-grid-item.module.css'
import { Utilities } from '../../../assets'
import { useState } from 'react'

// Components
import Button from '../buttons/button'
import Dropdown from '../inputs/dropdown'
import IconClickable from '../buttons/icon-clickable'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'

const FolderGridItem = ({
	name,
	size,
	length,
	assets,
	viewFolder,
	editFolder = (id) => { },
	download = (id) => { },
	archiveFolder = (id) => { },
	deleteFolder = (id) => { }
}) => {

	return (
		<div className={styles.container}>
			<div className={styles['image-wrapper']}>
				{assets.map(({ thumbailUrl }) => (
					// <div className={styles['sub-image-wrapper']}>
					<img src={thumbailUrl} alt={name} />
					// </div>
				))}
			</div>
			<div className={styles['image-button-wrapper']}>
				<Button styleType={'primary'} text={'View Details'} type={'button'}
					onClick={viewFolder} />
			</div>
			<div className={styles.info}>
				<div className='normal-text'>{name}</div>
				<div className={styles['details-wrapper']}>
					<div className='secondary-text'>{`${length} Assets`}</div>
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
									options={[
										{ label: 'Edit', onClick: editFolder },
										{ label: 'Download', onClick: download },
										{ label: 'Archive', onClick: archiveFolder },
										{ label: 'Delete', onClick: deleteFolder }
									]}
								/>
							</div>
						)}
					/>

				</div>
			</div>
		</div >
	)
}

export default FolderGridItem