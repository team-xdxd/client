import Router from 'next/router'
import Head from 'next/head'
// Import global css
import '../styles/general.css'
import '../styles/auth.css'
import '../styles/time-picker.css'
import '../styles/detail-pages.css'
import '../styles/select.css'
import '../styles/schedule.css'
import '../styles/text.css'
import '../styles/search.css'
import '../styles/loading-skeleton.css'
import 'react-day-picker/lib/style.css';
// Import stripe as a side effect so it helps detect fraudulent activy
import '@stripe/stripe-js';
import dragndropPolyfill from '../polyfills/dragndroptouch'
import { useState, useEffect } from 'react'
import { UserContext, LanguageContext, ThemeContext } from '../context'
import AssetContextProvider from '../context/asset-provider'
import cookiesUtils from '../utils/cookies'
import requestsUtils from '../utils/requests'

import userApi from '../server-api/user'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // set up context following this: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
  const [user, setUser] = useState(null)

  const fetchUser = async (redirectLogin = false) => {
    if(redirectLogin) return Router.replace('/login')
    const jwt = cookiesUtils.get('jwt')
    if (jwt && Router.pathname.indexOf('/share') === -1) {
      requestsUtils.setAuthToken(jwt)
      try {
        const { data } = await userApi.getUserData()
        setUser(data)
        if (Router.pathname.indexOf('/main') === -1)
          Router.replace('/main/overview')
      } catch (err) {
        console.log(err)
        initialRedirect()
      }
    } else initialRedirect()
  }

  const initialRedirect = () => {
    if (Router.pathname.indexOf('/signup') === -1 && Router.pathname.indexOf('/share') === -1) {
      Router.replace('/login')
    }
  }

  const logOut = () => {
    cookiesUtils.remove('jwt')
    requestsUtils.removeAuthToken()
    Router.replace('/login')
  }

  const userValue = { user, setUser, fetchUser, logOut }

  const [language, setLanguage] = useState("en")
  const languageValue = { language, setLanguage }

  const [theme, setTheme] = useState("light")
  const themeValue = { theme, setTheme }

  const [initialLoadFinished, setInitialLoadFinished] = useState(false)

  const resizeWindow = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', () => {
      resizeWindow()
    })
    getUserData()
    dragndropPolyfill()
  }, [])

  const getUserData = async () => {
    await fetchUser()
    setInitialLoadFinished(true)
  }

  return (

    <UserContext.Provider value={userValue} >
      <LanguageContext.Provider value={languageValue}>
        <ThemeContext.Provider value={themeValue}>
          <AssetContextProvider>
            <Head>
              <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key={`gtwo80vc34l8vjd`}></script>
            </Head>
            {initialLoadFinished &&
              <Component {...pageProps} />
            }
          </AssetContextProvider>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </UserContext.Provider>
  )
}