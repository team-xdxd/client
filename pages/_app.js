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
import '../styles/billing-settings.css'
import '../styles/overlays.css'
import '../styles/toast.css'
import 'react-day-picker/lib/style.css'
import 'emoji-mart/css/emoji-mart.css'
// Import stripe as a side effect so it helps detect fraudulent activy
import '@stripe/stripe-js';
import dragndropPolyfill from '../polyfills/dragndroptouch'
import ReactGA from 'react-ga'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LanguageContext, ThemeContext } from '../context'
import AssetContextProvider from '../context/asset-provider'
import TeamContextProvider from '../context/team-provider'
import UserContextProvider from '../context/user-provider'
import LoadingContextProvider from '../context/loading-provider'
import ScheduleProvider from '../context/schedule-provider'

// FB pixel
import FBPixel from '../components/common/scripts/fb-pixel'

import requestUtils from '../utils/requests'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // set up context following this: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component  
  const [language, setLanguage] = useState("en")
  const languageValue = { language, setLanguage }

  const [theme, setTheme] = useState("light")
  const themeValue = { theme, setTheme }

  const resizeWindow = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const router = useRouter()

  useEffect(() => {
    requestUtils.setForbiddenInterceptor()
    resizeWindow()
    window.addEventListener('resize', () => {
      resizeWindow()
    })
    dragndropPolyfill()
    if (process.env.INCLUDE_GOOGLE_ANALYTICS === 'yes') {
      ReactGA.initialize('UA-170704013-1')
    }
  }, [])

  useEffect(() => {
    if (process.env.INCLUDE_GOOGLE_ANALYTICS === 'yes') {
      ReactGA.ga('set', 'page', router.asPath);
      ReactGA.ga('send', 'pageview');
    }
  }, [router.asPath])

  return (
    <LoadingContextProvider>
      <UserContextProvider >
        <ScheduleProvider>
          <LanguageContext.Provider value={languageValue}>
            <ThemeContext.Provider value={themeValue}>
              <AssetContextProvider>
                <TeamContextProvider>
                  <Head>
                    <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key={process.env.DROPBOX_API_KEY}></script>
                  </Head>
                  {process.env.INCLUDE_PIXEL === 'yes' && <FBPixel />}
                  <Component {...pageProps} />
                </TeamContextProvider>
              </AssetContextProvider>
            </ThemeContext.Provider>
          </LanguageContext.Provider>
        </ScheduleProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  )
}