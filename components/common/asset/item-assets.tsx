import { useState, useEffect, useContext } from 'react'
import { AssetContext } from '../../../context'
import assetApi from '../../../server-api/asset'
import styles from './item-assets.module.css'
import update from 'immutability-helper'

// Components
import AssetGrid from './asset-grid'
import AssetOps from './asset-ops'
import { DropzoneProvider } from '../misc/dropzone'

const ItemAssets = ({ type, itemId }) => {

  const { assets, setAssets } = useContext(AssetContext)

  const getAssets = async () => {
    try {
      const queryParams = {}
      if (type === 'project') queryParams.projectId = itemId
      if (type === 'task') queryParams.taskId = itemId
      const { data } = await assetApi.getAssets(queryParams)
      setAssets(data)
    } catch (err) {
      //TODO: Handle error
      console.log(err)
    }
  }

  useEffect(() => {
    getAssets()
  }, [])

  const onFilesDataGet = async (files) => {
    try {
      const formData = new FormData()
      const currentDataClone = [...assets]
      const newPlaceholders = []
      files.forEach(file => {
        newPlaceholders.push({
          asset: {
            name: file.originalFile.name,
            createdAt: new Date()
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
    } catch (err) {
      //TODO: Handle error
      console.log(err)
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

        />
      </div>
      <AssetOps />
    </DropzoneProvider>
  )
}

export default ItemAssets