import { createContext } from 'react'

export const UserContext = createContext({
  user: null,
  setUser: (user) => { },
  fetchUser: () => { }
})

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => { }
})

export const LanguageContext = createContext({
  language: "en",
  setLanguage: () => { }
})

