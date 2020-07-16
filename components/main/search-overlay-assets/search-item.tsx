import styles from './search-item.module.css'
import Router from 'next/router'
import { format } from 'date-fns'
import Highlighter from "react-highlight-words"
import { getAssociatedCampaigns } from '../../../utils/asset'
import { useState } from 'react'

// Components
import AssetImg from '../../common/asset/asset-img'
import DetailOverlay from '../../common/asset/detail-overlay'

const SearchItem = ({ assetItem, term, openShareAsset, openDeleteAsset }) => {

  const { asset, thumbailUrl, realUrl } = assetItem
  const [visibleOverlay, setVisibleOVerlay] = useState(false)

  return (
    <>
      <li
        className={'search-item'}
        onClick={() => setVisibleOVerlay(true)}>
        <div className={styles['image-wrapper']}>
          <AssetImg type={asset.type} name={asset.name} thumbailUrl={thumbailUrl} />
        </div>
        <div className={styles.name}>
          <Highlighter
            highlightClassName={'search-highlight'}
            searchWords={[term]}
            autoEscape={true}
            textToHighlight={asset.name}
          />
        </div>
        <div className={styles.campaign}>
          <Highlighter
            highlightClassName={'search-highlight'}
            searchWords={[term]}
            autoEscape={true}
            textToHighlight={getAssociatedCampaigns(asset)}
          />
        </div>
        <div className={styles.extension}>
          <Highlighter
            highlightClassName={'search-highlight'}
            searchWords={[term]}
            autoEscape={true}
            textToHighlight={asset.extension}
          />
        </div>
        <div className={styles.folder}>
          <Highlighter
            highlightClassName={'search-highlight'}
            searchWords={[term]}
            autoEscape={true}
            textToHighlight={asset.folder?.name || 'No Folder'}
          />
        </div>
      </li >
      {visibleOverlay &&
        <DetailOverlay
          asset={asset}
          realUrl={realUrl}
          openShareAsset={openShareAsset}
          openDeleteAsset={openDeleteAsset}
          closeOverlay={() => setVisibleOVerlay(false)} />
      }
    </>
  )
}

export default SearchItem

