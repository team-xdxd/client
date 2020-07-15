import { useState } from 'react'
import { AssetContext } from '../context'

export default ({ children }) => {
    const [assets, setAssets] = useState([])
    const [folders, setFolders] = useState([])

    const [operationAsset, setOperationAsset] = useState(null)
    const [operationFolder, setOperationFolder] = useState('')

    const [activeOperation, setActiveOperation] = useState('')
    const assetsValue = {
        assets,
        setAssets,
        folders,
        setFolders,
        activeOperation,
        setActiveOperation,
        operationAsset,
        setOperationAsset,
        operationFolder,
        setOperationFolder
    }
    return (
        <AssetContext.Provider value={assetsValue}>
            {children}
        </AssetContext.Provider>
    )
}