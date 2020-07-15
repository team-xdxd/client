import { createContext } from 'react'
import { create } from 'domain'

export const UserContext = createContext({
    user: null,
    setUser: (user) => { },
    fetchUser: () => { },
    logOut: () => { }
})

export const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => { }
})

export const LanguageContext = createContext({
    language: "en",
    setLanguage: () => { }
})

export const DragContext = createContext({
    item: null,
    setItem: (item) => { }
})

export const AssetContext = createContext({
    assets: [],
    setAssets: (assets) => { },
    folders: [],
    setFolders: (folders) => { },

    operationAsset: null,
    setOperationAsset: (asset) => { },

    operationFolder: null,
    setOperationFolder: (folder) => { },

    activeOperation: '',
    setActiveOperation: (op) => { }
})
