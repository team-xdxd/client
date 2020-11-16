import Router, { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { LoadingContext, UserContext } from '../context'
import cookiesUtils from '../utils/cookies'
import requestsUtils from '../utils/requests'

import userApi from '../server-api/user'

const allowedBase = ['/signup', '/share', '/reset-password', '/forgot-password', '/two-factor']

export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [initialLoadFinished, setInitialLoadFinished] = useState(false)

  const { setIsLoading } = useContext(LoadingContext)

  const router = useRouter()

  const fetchUser = async (redirectLogin = false) => {
    if (redirectLogin) return Router.replace('/login')
    const jwt = cookiesUtils.get('jwt')

    if (jwt) requestsUtils.setAuthToken(jwt)

    const needTwoFactor = cookiesUtils.get('twoFactor')
    cookiesUtils.remove('twoFactor')
    if (needTwoFactor && Router.pathname.indexOf('/two-factor') === -1) {
      return Router.replace('/two-factor')
    }

    if (jwt && !needTwoFactor) {
      try {
        setIsLoading(true)
        const { data } = await userApi.getUserData()
        setUser(data)
        if (!data.firstTimeLogin && Router.pathname.indexOf('/main/setup') === -1) {
          await Router.replace('/main/setup')
        }
        else if (Router.pathname.indexOf('/main') === -1)
          await Router.replace('/main/overview')

      } catch (err) {
        console.log(err)
        initialRedirect()
      } finally {
        setIsLoading(false)
      }
    } else initialRedirect()
  }

  const initialRedirect = () => {
    if (!allowedBase.some(url => Router.pathname.indexOf(url) !== -1)) {
      Router.replace('/login')
    }
  }

  const logOut = () => {
    cookiesUtils.remove('jwt')
    requestsUtils.removeAuthToken()
    Router.replace('/login')
  }

  const hasPermission = (requiredPermissions = []) => {
    if (requiredPermissions.length === 0) return true
    return requiredPermissions.some(perm => user?.permissions.map(userPerm => userPerm.id).includes(perm))
  }

  const afterAuth = async ({ twoFactor, token }) => {
    cookiesUtils.setUserJWT(token)
    if (twoFactor) {
      cookiesUtils.set('twoFactor', 'true')
    }
    await fetchUser()
  }

  useEffect(() => {
    if (router.route) {
      getUserData()
    }
  }, [router.route])

  const getUserData = async () => {
    await fetchUser()
    setInitialLoadFinished(true)
  }

  const userValue = {
    user,
    setUser,
    fetchUser,
    logOut,
    hasPermission,
    initialLoadFinished,
    afterAuth
  }

  return (
    <UserContext.Provider value={userValue}>
      {initialLoadFinished && children}
    </UserContext.Provider>
  )
}