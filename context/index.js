import { createContext } from 'react'
import { create } from 'domain'

export const UserContext = createContext({
    user: null,
    setUser: (user) => { },
    fetchUser: (redirectUser) => { },
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
    nextPage: 0,
    totalAssets: 0,
    assets: [],
    setAssets: (assets, replace) => { },
    folders: [],
    setFolders: (folders) => { },
    setPlaceHolders: (type, replace) => { },
    operationAsset: null,
    setOperationAsset: (asset) => { },

    operationFolder: null,
    setOperationFolder: (folder) => { },

    activeOperation: '',
    setActiveOperation: (op) => { },

    activeFolder: '',
    setActiveFolder: (folderId) => { },

    activePageMode: '',
    setActivePageMode: (mode) => { },

    needsFetch: '',
    setNeedsFetch: (type) => { },

    addedIds: [],
    setAddedIds: (idList) => { }
})

export const TeamContext = createContext({
    team: null,
    patchTeam: (patchData) => { },
    getTeam: () => { },
    teamMembers: [],
    setTeamMembers: (data) => { },
    getTeamMembers: () => { }
})

export const LocationContext = createContext({
    countries: [],
    loadCountries: () => { },

    states: [],
    loadStates: (countryId) => { },

    cities: [],
    loadCities: (stateId) => { },
})