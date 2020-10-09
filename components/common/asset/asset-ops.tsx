import { AssetContext } from '../../../context'
import { useState, useContext, useEffect } from 'react'
import assetApi from '../../../server-api/asset'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import folderApi from '../../../server-api/folder'
import toastUtils from '../../../utils/toast'
import { useRouter } from 'next/router'
import update from 'immutability-helper'

// Components
import MoveModal from '../modals/move-modal'
import ShareModal from '../modals/share-modal'
import ConfirmModal from '../modals/confirm-modal'

export default () => {

	const {
		assets,
		setAssets,
		folders,
		setFolders,
		activeOperation,
		setActiveOperation,
		operationAsset,
		setOperationAsset,
		operationFolder,
		setOperationFolder,
		activeFolder,
		activePageMode
	} = useContext(AssetContext)

	const router = useRouter()

	const [currentItem, setCurrentItem] = useState({
		type: '',
		id: ''
	})

	useEffect(() => {
		if (activeOperation === 'move' || activeOperation === 'copy') {
			getFolders()
		}
	}, [activeOperation])

	useEffect(() => {
		const { asPath } = router
		if (asPath.indexOf('project') !== -1) {
			setCurrentItem({
				type: 'project',
				id: asPath.split('/')[3]
			})
		} else if (asPath.indexOf('task') !== -1) {
			setCurrentItem({
				type: 'task',
				id: asPath.split('/')[3]
			})
		} else {
			setCurrentItem({
				type: '',
				id: ''
			})
		}
	}, [router.asPath])

	const getFolders = async () => {
		try {
			const { data } = await folderApi.getFolders()
			setFolders(data)
		} catch (err) {
			//TODO: Handle error
			console.log(err)
		}
	}


	const closeModalAndClearOpAsset = () => {
		setActiveOperation('')
		setOperationAsset(null)
		setOperationFolder(null)
	}

	const selectedAssets = assets.filter(asset => asset.isSelected)

	const moveAssets = async (selectedFolder) => {
		try {
			let updateAssets
			if (!operationAsset) {
				updateAssets = selectedAssets.map(selectedAsset => (
					{ id: selectedAsset.asset.id, changes: { folderId: selectedFolder } }
				))
			} else {
				updateAssets = [{
					id: operationAsset.asset.id, changes: { folderId: selectedFolder }
				}]
			}

			await assetApi.updateMultiple(updateAssets)
			closeModalAndClearOpAsset()
			if (activeFolder && activeFolder !== selectedFolder) {
				removeSelectedFromList()
			}
			toastUtils.success('Assets moved successfully')
		} catch (err) {
			console.log(err)
			toastUtils.error('Could not move assets, please try again later.')
		}
	}

	const archiveAssets = async () => {
		modifyAssetsStage('archived', 'Assets archived successfully', 'Could not archive assets, please try again later.')
	}

	const unarchiveAssets = async () => {
		modifyAssetsStage('draft', 'Assets unarchived successfully', 'Could not unarchive assets, please try again later.')
	}

	const modifyAssetsStage = async (stage, successMessage, errMessage) => {
		try {
			let updateAssets
			if (!operationAsset) {
				updateAssets = selectedAssets.map(assetItem => (
					{ id: assetItem.asset.id, changes: { stage } }
				))
			} else {
				updateAssets = [{
					id: operationAsset.asset.id, changes: { stage }
				}]
			}

			await assetApi.updateMultiple(updateAssets)
			removeSelectedFromList()
			closeModalAndClearOpAsset()
			toastUtils.success(successMessage)
		} catch (err) {
			console.log(err)
			toastUtils.error(errMessage)
		}
	}

	const deleteSelectedAssets = async () => {
		try {
			if (!operationAsset) {
				await assetApi.deleteMultipleAssets({ assetIds: selectedAssets.map(assetItem => assetItem.asset.id) })
				const newAssets = assets.filter(existingAsset => {
					const searchedAssetIndex = selectedAssets.findIndex(assetListItem => existingAsset.asset.id === assetListItem.asset.id)
					return searchedAssetIndex === -1
				})

				setAssets(newAssets)
			} else {
				await assetApi.deleteAsset(operationAsset.asset.id)
				const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === operationAsset.asset.id)
				if (assetIndex !== -1)
					setAssets(update(assets, {
						$splice: [[assetIndex, 1]]
					}))
			}

			closeModalAndClearOpAsset()
			toastUtils.success('Assets deleted successfully')
		} catch (err) {
			console.log(err)
			toastUtils.error('Could not delete assets, please try again later.')
		}
	}

	const shareAssets = async (recipients, message) => {
		try {
			let assetIds
			if (operationAsset) {
				assetIds = operationAsset.asset.id
			}
			else if (operationFolder) {
				assetIds = operationFolder.assets.map(asset => asset.id).join(',')
			}
			else {
				assetIds = selectedAssets.map(assetItem => assetItem.asset.id).join(',')
			}
			await assetApi.generateAndSendShareUrl({
				recipients,
				message,
				assetIds
			})
			toastUtils.success('Assets shared succesfully')
			closeModalAndClearOpAsset()
		} catch (err) {
			console.log(err)
			toastUtils.error('Could not share assets, please try again later.')
		}
	}

	const copyAssets = async (selectedFolder) => {
		try {
			let copyAssetIds
			if (!operationAsset) {
				copyAssetIds = selectedAssets.map(selectedAsset => selectedAsset.asset.id)
			} else {
				copyAssetIds = [operationAsset.asset.id]
			}

			const { data } = await assetApi.copyAssets({ idList: copyAssetIds, folderId: selectedFolder })
			closeModalAndClearOpAsset()
			toastUtils.success('Assets copied successfully')
			if (!activeFolder && activePageMode === 'library') {
				setAssets(update(assets, { $unshift: data }))
			}
		} catch (err) {
			console.log(err)
			if (err.response?.status === 402) toastUtils.error(err.response.data.message)
			else toastUtils.error('Could not copy assets, please try again later.')
		}
	}

	const createFolder = async (newFolderName) => {
		try {
			const { data } = await folderApi.createFolder({ name: newFolderName })
			setFolders(update(folders, { $push: [data] }))
		} catch (err) {
			console.log(err)
			toastUtils.error('Could not create folder, please try again later.')
		}
	}

	const removeSelectedAssetsFromItem = async () => {
		try {
			if (!operationAsset) {
				if (currentItem.type === 'project') {
					await projectApi.associateAssets(currentItem.id, { assetIds: selectedAssets.map(assetItem => assetItem.asset.id) }, { operation: 'disassociate' })
				} else if (currentItem.type === 'task') {
					await taskApi.associateAssets(currentItem.id, { assetIds: selectedAssets.map(assetItem => assetItem.asset.id) }, { operation: 'disassociate' })
				}
				const newAssets = assets.filter(existingAsset => {
					const searchedAssetIndex = selectedAssets.findIndex(assetListItem => existingAsset.asset.id === assetListItem.asset.id)
					return searchedAssetIndex === -1
				})

				setAssets(newAssets)
			} else {
				if (currentItem.type === 'project') {
					await projectApi.associateAssets(currentItem.id, { assetIds: [operationAsset.asset.id] }, { operation: 'disassociate' })
				} else if (currentItem.type === 'task') {
					await taskApi.associateAssets(currentItem.id, { assetIds: [operationAsset.asset.id] }, { operation: 'disassociate' })					
				}
				const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === operationAsset.asset.id)
				if (assetIndex !== -1)
					setAssets(update(assets, {
						$splice: [[assetIndex, 1]]
					}))
			}

			closeModalAndClearOpAsset()
			toastUtils.success('Assets removed successfully')
		} catch (err) {
			console.log(err)
			toastUtils.error('Could not remove assets, please try again later.')
		}
	}

	const removeSelectedFromList = () => {
		if (!operationAsset) {
			const newAssets = assets.filter(existingAsset => {
				const searchedAssetIndex = selectedAssets.findIndex(assetListItem => existingAsset.asset.id === assetListItem.asset.id)
				return searchedAssetIndex === -1
			})

			setAssets(newAssets)
		} else {
			const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === operationAsset.asset.id)
			setAssets(update(assets, {
				$splice: [[assetIndex, 1]]
			}))
		}
	}

	let operationLength = 0
	if (operationAsset) {
		operationLength = 1
	}
	else if (operationFolder) {
		operationLength = operationFolder.assets.length
	}
	else {
		operationLength = selectedAssets.length
	}

	const filteredFolders = folders.filter(folder => folder.id !== activeFolder)

	return (
		<>
			<MoveModal
				modalIsOpen={activeOperation === 'move'}
				folders={filteredFolders}
				closeModal={closeModalAndClearOpAsset}
				itemsAmount={operationLength}
				moveAssets={moveAssets}
				createFolder={createFolder}
			/>
			<MoveModal
				modalIsOpen={activeOperation === 'copy'}
				folders={filteredFolders}
				closeModal={closeModalAndClearOpAsset}
				itemsAmount={operationLength}
				moveAssets={copyAssets}
				confirmText={'Copy'}
				createFolder={createFolder}
			/>
			<ShareModal
				modalIsOpen={activeOperation === 'share'}
				closeModal={closeModalAndClearOpAsset}
				itemsAmount={operationLength}
				shareAssets={shareAssets}
			/>
			<ConfirmModal
				modalIsOpen={activeOperation === 'archive'}
				closeModal={closeModalAndClearOpAsset}
				confirmAction={archiveAssets}
				confirmText={'Archive'}
				message={`Archive ${operationLength} item(s)?`}
			/>
			<ConfirmModal
				modalIsOpen={activeOperation === 'unarchive'}
				closeModal={closeModalAndClearOpAsset}
				confirmAction={unarchiveAssets}
				confirmText={'Unarchive'}
				message={`Unarchive ${operationLength} item(s)?`}
			/>
			<ConfirmModal
				modalIsOpen={activeOperation === 'delete'}
				closeModal={closeModalAndClearOpAsset}
				confirmAction={deleteSelectedAssets}
				confirmText={'Delete'}
				message={`Delete ${operationLength} item(s)?`}
			/>
			<ConfirmModal
				modalIsOpen={activeOperation === 'remove_item'}
				closeModal={closeModalAndClearOpAsset}
				confirmAction={removeSelectedAssetsFromItem}
				confirmText={'Remove'}
				message={`Remove ${operationLength} item(s) from ${currentItem.type}?`}
			/>
		</>
	)
}