import { useState } from 'react'
import { AssetContext } from '../context'

const loadingDefaultAsset = {
    asset: {
        name: 'placeholder',
        createdAt: new Date(),
        type: 'image'
    },
    isLoading: true
}

const loadingDefaultFolder = {
    name: 'placeholder',
    length: 10,
    assets: [],
    isLoading: true,
    createdAt: new Date()
}

export default ({ children }) => {
    const [assets, setAssets] = useState([])
    const [folders, setFolders] = useState([])

    const [operationAsset, setOperationAsset] = useState(null)
    const [operationFolder, setOperationFolder] = useState('')

    const [activeOperation, setActiveOperation] = useState('')

    const [activeFolder, setActiveFolder] = useState('')
    const [activePageMode, setActivePageMode] = useState('')

    const [nextPage, setNextPage] = useState(1)
    const [totalAssets, setTotalAssets] = useState(0)

    const setPlaceHolders = (type, replace = true) => {
        if (type === 'asset') {
            if (replace)
                setAssets(Array(10).fill(loadingDefaultAsset))
            else
                setAssets([...assets, ...Array(10).fill(loadingDefaultAsset)])
        } else {
            if (replace)
                setFolders(Array(10).fill(loadingDefaultFolder))
            else
                setFolders([...folders, ...Array(10).fill(loadingDefaultFolder)])
        }
    }

    const setAssetItems = (inputAssets, replace = true) => {
        const { results, next, total } = inputAssets
        if (results) inputAssets = results
        if (next) setNextPage(next)
        if (total) setTotalAssets(total)

        if (replace)
            setAssets(inputAssets)
        else
            setAssets([...assets.filter(asset => !asset.isLoading), ...inputAssets])
    }

    const setFolderItems = (inputFolders, replace = true) => {
        if (replace)
            setFolders(inputFolders)
        else
            setFolders([...folders.filter(folder => !folder.isLoading), ...inputFolders])
    }

    const assetsValue = {
        assets,
        setAssets: setAssetItems,
        nextPage,
        totalAssets,
        folders,
        setFolders: setFolderItems,
        setPlaceHolders,
        activeOperation,
        setActiveOperation,
        operationAsset,
        setOperationAsset,
        operationFolder,
        setOperationFolder,
        activeFolder,
        setActiveFolder,
        activePageMode,
        setActivePageMode
    }
    return (
        <AssetContext.Provider value={assetsValue}>
            {children}
        </AssetContext.Provider>
    )
}