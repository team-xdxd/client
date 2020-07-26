import styles from './asset-addition.module.css'
import { useRef, useState, useContext } from 'react'
import { Assets } from '../../../assets'
import { AssetContext } from '../../../context'
import toastUtils from '../../../utils/toast'
import cookiesUtils from '../../../utils/cookies'
import assetApi from '../../../server-api/asset'
import folderApi from '../../../server-api/folder'

// Components
import SimpleButton from '../buttons/simple-button'
import ToggleAbleAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import DriveSelector from '../asset/drive-selector'
import FolderModal from '../folder/folder-modal'

const AssetAddition = ({
	activeFolder = '',
	getFolders = () => { },
	folderAdd = true,
	type = '',
	itemId = ''
}) => {

	const fileBrowserRef = useRef(undefined)

	const [activeModal, setActiveModal] = useState('')
	const [submitError, setSubmitError] = useState('')

	const { assets, setAssets } = useContext(AssetContext)

	const onFilesDataGet = async (files) => {
		const currentDataClone = [...assets]
		try {
			const formData = new FormData()
			const newPlaceholders = []
			files.forEach(file => {
				newPlaceholders.push({
					asset: {
						name: file.originalFile.name,
						createdAt: new Date(),
						size: file.originalFile.size,
						stage: 'draft',
						type: 'image'
					},
					isUploading: true
				})
				formData.append('asset', file.originalFile)
			})
			setAssets([...newPlaceholders, ...currentDataClone])
			const { data } = await assetApi.uploadAssets(formData, getCreationParameters())
			setAssets([...data, ...currentDataClone])
			toastUtils.success('Assets uploaded.')
		} catch (err) {
			setAssets(currentDataClone)
			console.log(err)
			toastUtils.error('Could not upload assets, please try again later.')
		}
	}

	const onDropboxFilesSelection = async (files) => {
		const currentDataClone = [...assets]
		try {
			const newPlaceholders = []
			files.forEach(file => {
				newPlaceholders.push({
					asset: {
						name: file.name,
						createdAt: new Date(),
						size: file.size,
						stage: 'draft',
						type: 'image'
					},
					isUploading: true
				})
			})
			setAssets([...newPlaceholders, ...currentDataClone])
			const { data } = await assetApi.importAssets('dropbox', files.map(file => ({ link: file.link, name: file.name })), getCreationParameters())
			setAssets([...data, ...currentDataClone])
			toastUtils.success('Assets imported.')
		} catch (err) {
			//TODO: Handle error
			setAssets(currentDataClone)
			console.log(err)
			toastUtils.error('Could not import assets, please try again later.')
		}
	}

	const onSubmit = async folderData => {
		try {
			await folderApi.createFolder(folderData)
			setActiveModal('')
			getFolders()
			toastUtils.success('Folder created sucesfully')
		} catch (err) {
			// TODO: Show error message
			if (err.response?.data?.message) {
				setSubmitError(err.response.data.message)
			} else {
				setSubmitError('Something went wrong, please try again later')
			}
		}
	}

	const openDropboxSelector = (files) => {
		//png, jpg, gif or mp4
		const options = {
			success: onDropboxFilesSelection,
			linkType: 'direct',
			multiselect: true,
			extensions: ['.png', '.jpg', '.gif', '.mp4'],
			folderselect: false,
			sizeLimit: 50 * 1024 * 1024
		}
		// Ignore this annoying warning
		Dropbox.choose(options)
	}

	const onDriveFilesSelection = async (files) => {
		const googleAuthToken = cookiesUtils.get('gdriveToken')
		const currentDataClone = [...assets]
		try {
			const newPlaceholders = []
			files.forEach(file => {
				newPlaceholders.push({
					asset: {
						name: file.name,
						createdAt: new Date(),
						size: file.sizeBytes,
						stage: 'draft',
						type: 'image'
					},
					isUploading: true
				})
			})
			setAssets([...newPlaceholders, ...currentDataClone])
			const { data } = await assetApi.importAssets('drive', files.map(file => ({
				googleAuthToken,
				id: file.id,
				name: file.name,
				size: file.sizeBytes,
				mimeType: file.mimeType
			})), getCreationParameters())
			setAssets([...data, ...currentDataClone])
			toastUtils.success('Assets imported.')
		} catch (err) {
			//TODO: Handle error
			setAssets(currentDataClone)
			console.log(err)
			toastUtils.error('Could not import assets, please try again later.')
		}
	}

	const dropdownOptions = [
		{
			label: 'Upload',
			text: 'png, jpg, gif or mp4',
			onClick: () => fileBrowserRef.current.click(),
			icon: Assets.file
		},
		{
			label: 'Dropbox',
			text: 'Import files',
			onClick: openDropboxSelector,
			icon: Assets.file
		},
		{
			label: 'Google Drive',
			text: 'Import files',
			onClick: () => { },
			icon: Assets.file,
			CustomContent: ({ children }) => (
				<DriveSelector
					onFilesSelect={onDriveFilesSelection}
				>
					{children}
				</DriveSelector>
			)
		}
	]

	if (folderAdd) {
		dropdownOptions.unshift({
			label: 'Add Folder',
			text: 'Orgnanized Files',
			onClick: () => setActiveModal('folder'),
			icon: Assets.folder
		})
	}

	const getCreationParameters = () => {
		const queryData = {}
		if (activeFolder) {
			queryData.folderId = activeFolder
		}
		if (type === 'project') queryData.projectId = itemId
		if (type === 'task') queryData.taskId = itemId
		return queryData
	}

	const onFileChange = (e) => {
		onFilesDataGet(Array.from(e.target.files).map(originalFile => ({ originalFile })))
	}


	const SimpleButtonWrapper = ({ children }) => (
		<div className={`${styles['button-wrapper']} ${!folderAdd && styles['button-wrapper-displaced']}`}>
			<SimpleButton text='+' />
			{children}
		</div>
	)

	const DropDownOptions = () => {

		const Content = (option) => {
			return (
				<li className={styles.option}
					onClick={option.onClick}>
					<img src={option.icon} />
					<div className={styles['option-label']}>{option.label}</div>
					<div className={styles['option-text']}>{option.text}</div>
				</li>
			)
		}

		return (
			<ul className={styles['options-list']}>
				{dropdownOptions.map(option => (
					<>
						{option.CustomContent ?
							<option.CustomContent>
								<Content {...option} />
							</option.CustomContent>
							:
							<Content {...option} />
						}
					</>
				))}
			</ul>
		)
	}

	return (
		<>
			<input multiple={true} id="file-input-id" ref={fileBrowserRef} style={{ display: 'none' }} type='file'
				onChange={onFileChange} accept='image/png, image/jpeg, image/gif, video/mp4' />
			<ToggleAbleAbsoluteWrapper
				Wrapper={SimpleButtonWrapper}
				Content={DropDownOptions}
			/>
			<FolderModal
				modalIsOpen={activeModal === 'folder'}
				closeModal={() => setActiveModal('')}
				onSubmit={onSubmit}
			/>
		</>
	)
}

export default AssetAddition