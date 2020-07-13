import styles from './asset-grid.module.css'
import useDropzone from '../misc/dropzone'
import { useEffect } from 'react'

// Components
import FolderGridItem from '../folder/folder-grid-item'
import FolderListItem from '../folder/folder-list-item'
import AssetThumbail from './asset-thumbail'
import ListItem from './list-item'
import AssetUpload from './asset-upload'


const AssetGrid = ({ activeView = 'grid', onFilesDataGet, assets, toggleSelected, mode = 'assets', folders = [], viewFolder = (id) => { } }) => {

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
            {mode === 'assets' && assets.map((assetItem) => {
              return (
                <li className={styles['grid-item']} key={assetItem.asset.id}>
                  <AssetThumbail {...assetItem} toggleSelected={() => toggleSelected(assetItem.asset.id)} />
                </li>
              )
            })}

            {mode === 'folders' && folders.map((folder) => {
              return (
                <li className={styles['grid-item']} key={folder.id}>
                  <FolderGridItem {...folder} viewFolder={() => viewFolder(folder.id)} />
                </li>
              )
            })}
          </ul>
        }
        {activeView === 'list' &&
          <ul className={'regular-list'}>
            {mode === 'assets' && assets.map((assetItem, index) => {
              return (
                <li className={styles['regular-item']} key={index}>
                  <ListItem 
                    assetItem={assetItem}
                    index={index}
                  />
                </li>
              )
            })}
            {mode === 'folders' && folders.map((folder) => {
              return (
                <li className={styles['grid-item']} key={folder.id}>
                  <FolderListItem {...folder} viewFolder={() => viewFolder(folder.id)} />
                </li>
              )
            })}
          </ul>
        }
      </div>
    </section >
  )
}

export default AssetGrid