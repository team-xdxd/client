import asset from "../../../server-api/asset"
import styles from "./list-item.module.css"
import { Assets } from '../../../assets'
import filesize from 'filesize'
import { format } from 'date-fns'

import StatusBadge from '../../common/misc/status-badge'

const ListItem = ({ assetItem, index }) => {

  const dateFormat = 'MMM do, yyyy h:mm a'

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        {index === 0 &&
          <>
            <h4> </h4>
            <h4>Name</h4>
            <h4>Stage</h4>
            <h4>Type</h4>
            <h4>Extension</h4>
            <h4>Size</h4>
            <h4>Created At</h4>
          </>
        }
      </div>
      <div className={styles.item}>
        <div className={styles.thumbnail}>
          <img src={assetItem.thumbailUrl || Assets.videoThumbnail} />
        </div>
        <div className={styles.field_name}>
          {assetItem.asset.name}
        </div>
        <div className={styles.status}>
          <StatusBadge status={assetItem.asset.stage} />
        </div>
        <div className={styles.field_name}>
          {assetItem.asset.type}
        </div>
        <div className={styles.field_name}>
          {assetItem.asset.extension}
        </div>
        <div className={styles.field_name}>
          {filesize(assetItem.asset.size)}
        </div>
        <div className={styles.field_name}>
          {format(new Date(assetItem.asset.createdAt), dateFormat)}
        </div>
      </div>
    </div>
  )
}

export default ListItem