import styles from './index.module.css'

// Components
import Folder from './folder'
import AssetUpload from '../../../common/asset-item/asset-upload'

const AssetList = ({ onFilesDataGet }) => {

  return (
    <section className={styles.container}>
      <AssetUpload
        onDragText={'Drop files here to upload'}
        inputEnabled={true}
        onFilesDataGet={onFilesDataGet}>

      </AssetUpload>
    </section>
  )
}

export default AssetList