import { useState, useEffect, useContext } from 'react'
import { AssetContext } from '../../../context'
import assetApi from '../../../server-api/asset'
import styles from './item-assets.module.css'
import update from 'immutability-helper'
import toastUtils from '../../../utils/toast'

// Components
import AssetGrid from './asset-grid'
import AssetOps from './asset-ops'
import { DropzoneProvider } from '../misc/dropzone'

const ItemAssets = ({ type, itemId }) => {

  const { assets, setAssets, setPlaceHolders, nextPage, setActiveFolder, setActivePageMode, addedIds, needsFetch, setNeedsFetch } = useContext(AssetContext)

  const getAssets = async (replace = true) => {
    try {
      setPlaceHolders('asset', replace)
      const queryParams = {}
      if (type === 'project') queryParams.projectId = itemId
      if (type === 'task') queryParams.taskId = itemId
      if (addedIds.length > 0) {
        queryParams.excludeIds = addedIds.join(',')
      }
      queryParams.page = replace ? 1 : nextPage
      const { data } = await assetApi.getAssets(queryParams)
      setAssets(data, replace)
    } catch (err) {
      //TODO: Handle error
      console.log(err)
      setAssets([])
      toastUtils.error('There was an error loading the assets.')
    }
  }

  useEffect(() => {
    setActivePageMode('item')
    setActiveFolder('')
    getAssets()
  }, [])

  useEffect(() => {
    if (needsFetch === 'assets') {
      getAssets()
      setNeedsFetch('')
    }
  }, [needsFetch])

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
            type: 'image'
          },
          isUploading: true
        })
        formData.append('asset', file.originalFile)
      })
      setAssets([...newPlaceholders, ...currentDataClone])
      const queryParams = {}
      if (type === 'project') queryParams.projectId = itemId
      if (type === 'task') queryParams.taskId = itemId
      const { data } = await assetApi.uploadAssets(formData, queryParams)
      setAssets([...data, ...currentDataClone])
      toastUtils.success('Assets uploaded.')
    } catch (err) {
      setAssets(currentDataClone)
      console.log(err)
      if (err.response?.status === 402) toastUtils.error(err.response.data.message)
      else toastUtils.error('Could not upload assets, please try again later.')
    }
  }

  const toggleSelected = (id) => {
    const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === id)
    setAssets(update(assets, {
      [assetIndex]: {
        isSelected: { $set: !assets[assetIndex].isSelected }
      }
    }))
  }

  return (
    <DropzoneProvider>
      <div className={styles.container}>
        <AssetGrid
          onFilesDataGet={onFilesDataGet}
          toggleSelected={toggleSelected}
          loadMore={() => getAssets(false)}
          mode='assets'
          type={type}
          itemId={itemId}
          itemSize={'medium'}
        />
      </div>
      <AssetOps />
    </DropzoneProvider>
  )
}

export default ItemAssets