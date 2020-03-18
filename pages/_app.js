// Import global css
import './styles.css'
import { useState } from 'react'
import { UserContext, LanguageContext, ThemeContext } from '../context'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  // set up context following this: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
  const [user, setUser] = useState(null)
  const userValue = { user, setUser }

  const [language, setLanguage] = useState("en")
  const languageValue = { language, setLanguage }

  const [theme, setTheme] = useState("light")
  const themeValue = { theme, setTheme }
  return (
    <UserContext.Provider value={userValue}>
      <LanguageContext.Provider value={languageValue}>
        <ThemeContext.Provider value={themeValue}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </UserContext.Provider>
  )
}