import styles from './asset-grid.module.css'
import useDropzone from '../misc/dropzone'
import { useEffect } from 'react'

// Components
import Folder from '../../main/assets-library/asset-list/folder'
import AssetThumbail from './asset-thumbail'
import ListItem from './list-item'
import AssetUpload from './asset-upload'


const AssetList = ({ activeView = 'grid', onFilesDataGet, assets }) => {

  const isDragging = useDropzone()

  return (
    <section className={styles.container}>
      {(assets.length === 0 || isDragging) &&
        <AssetUpload
          onDragText={'Drop files here to upload'}
          preDragText={assets.length === 0 ? `Drag 'n' drop some files here` : ''}          
          onFilesDataGet={onFilesDataGet} />
      }
      <div className={styles['list-wrapper']}>
        {activeView === 'grid' &&
          <ul className={styles['grid-list']}>
            {assets.map((assetItem, index) => {

              return (
                <li className={styles['grid-item']} key={assetItem.asset.id}>
                  <AssetThumbail {...assetItem} />
                </li>
              )
            })}
          </ul>
        }
        {activeView === 'list' &&
          <ul className={'regular-list'}>
            {assets.map((assetItem, index) => {

              return (
                <li className={styles['regular-item']} key={assetItem.asset.id}>
                  <ListItem />
                </li>
              )
            })}
          </ul>
        }
      </div>
    </section >
  )
}

export default AssetList