import { AssetContext } from '../../../context'
import { useState, useContext, useEffect } from 'react'
import assetApi from '../../../server-api/asset'
import folderApi from '../../../server-api/folder'
import toastUtils from '../../../utils/toast'
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

	useEffect(() => {
		if (activeOperation === 'move' || activeOperation === 'copy') {
			getFolders()
		}
	}, [activeOperation])

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
		try {
			let updateAssets
			if (!operationAsset) {
				updateAssets = selectedAssets.map(assetItem => (
					{ id: assetItem.asset.id, changes: { stage: 'archived' } }
				))
			} else {
				updateAssets = [{
					id: operationAsset.asset.id, changes: { stage: 'archived' }
				}]
			}

			await assetApi.updateMultiple(updateAssets)
			removeSelectedFromList()
			closeModalAndClearOpAsset()
			toastUtils.success('Assets archived successfully')
		} catch (err) {
			console.log(err)
			toastUtils.error('Could not archive assets, please try again later.')
		}
	}

	const deleteSelectedAssets = async () => {
		try {

			if (!operationAsset) {
				const deletePromises = selectedAssets.map(assetItem => assetApi.deleteAsset(assetItem.asset.id))
				await Promise.all(deletePromises)

				const newAssets = assets.filter(existingAsset => {
					const searchedAssetIndex = selectedAssets.findIndex(assetListItem => existingAsset.asset.id === assetListItem.asset.id)
					return searchedAssetIndex === -1
				})

				setAssets(newAssets)
			} else {
				await assetApi.deleteAsset(operationAsset.asset.id)
				const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === operationAsset.asset.id)
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
			await assetApi.generateAndSendShareUrl({
				recipients,
				message,
				assetIds: !operationAsset ? selectedAssets.map(assetItem => assetItem.asset.id).join(',') : operationAsset.asset.id
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
			toastUtils.error('Could not copy assets, please try again later.')
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

	const operationLength = operationAsset ? 1 : selectedAssets.length

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
				modalIsOpen={activeOperation === 'delete'}
				closeModal={closeModalAndClearOpAsset}
				confirmAction={deleteSelectedAssets}
				confirmText={'Delete'}
				message={`Delete ${operationLength} item(s)?`}
			/>
		</>
	)
}