import { useState, useContext, useEffect } from 'react'
import { AssetContext } from '../../../context'
import styles from './index.module.css'
import assetApi from '../../../server-api/asset'

// Components
import Search from '../../common/inputs/search'
import SearchItem from './search-item'

const SearchOverlayAssets = ({ closeOverlay }) => {

  const { assets, setAssets, setActiveOperation, setOperationAsset } = useContext(AssetContext)
  const [term, setTerm] = useState('')

  const getData = async (inputTerm) => {
    setTerm(inputTerm)
    try {
      const { data } = await assetApi.getAssets({ term: inputTerm })
      setAssets(data)
    } catch (err) {
      // TODO: Handle this error
      console.log(err)
    }
  }

  useEffect(() => {
    setAssets([])
  }, [])

  const beginAssetOperation = (asset, operation) => {
    setOperationAsset(asset)
    setActiveOperation(operation)
  }

  return (
    <div className={`app-overlay search-container`}>
      <div className={'search-top'}>
        <div className={'search-close'} onClick={closeOverlay}>
          <span className={'search-x'}>X</span>
          <span>esc</span>
        </div>
      </div>
      <div className={'search-content'}>
        <h2 >
          Search Assets
        </h2>
        <div className={'search-cont'}>
          <Search
            placeholder={'Find Assets by Name, Extension, Folder, Campaign'}
            onSubmit={(inputTerm) => getData(inputTerm)}
          />
        </div>
        <ul>
          {assets.map((assetItem, index) => (
            <SearchItem
              key={index}
              assetItem={assetItem}
              term={term}
              openShareAsset={() => beginAssetOperation(assetItem, 'share')}
              openDeleteAsset={() => beginAssetOperation(assetItem, 'delete')}
            />
          ))}
        </ul>
      </div>
    </div >
  )
}

export default SearchOverlayAssets
