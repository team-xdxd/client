// Import global css
import '../styles/general.css'
import '../styles/auth.css'
// Import stripe as a side effect so it helps detect fraudulent activy
import '@stripe/stripe-js';
import { useState, useEffect } from 'react'
import { UserContext, LanguageContext, ThemeContext } from '../context'
import cookiesUtils from '../utils/cookies'
import requestsUtils from '../utils/requests'

import userApi from '../server-api/user'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  // set up context following this: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const jwt = cookiesUtils.get('jwt')
    if (jwt) {
      requestsUtils.setAuthToken(jwt)
      try {
        const { data } = await userApi.getUserData()
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const userValue = { user, setUser, fetchUser }

  const [language, setLanguage] = useState("en")
  const languageValue = { language, setLanguage }

  const [theme, setTheme] = useState("light")
  const themeValue = { theme, setTheme }

  const [initialLoadFinished, setInitialLoadFinished] = useState(false)

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    await fetchUser()
    setInitialLoadFinished(true)
  }

  return (
    <UserContext.Provider value={userValue} >
      <LanguageContext.Provider value={languageValue}>
        <ThemeContext.Provider value={themeValue}>
          {initialLoadFinished &&
            <Component {...pageProps} />
          }
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </UserContext.Provider>
  )
}