import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { UserContext } from '../context'
import cookiesUtils from '../utils/cookies'
import requestsUtils from '../utils/requests'

import userApi from '../server-api/user'

export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [initialLoadFinished, setInitialLoadFinished] = useState(false)

  const router = useRouter()
  const fetchUser = async (redirectLogin = false) => {
    if (redirectLogin) return Router.replace('/login')
    const jwt = cookiesUtils.get('jwt')
    if (jwt && Router.pathname.indexOf('/share') === -1) {
      requestsUtils.setAuthToken(jwt)
      try {
        const { data } = await userApi.getUserData()
        setUser(data)
        if (!data.firstTimeLogin) {
          Router.replace('/main/setup')
        }
        else if (Router.pathname.indexOf('/main') === -1)
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

  const hasPermission = (requiredPermissions = []) => {
    if (requiredPermissions.length === 0) return true
    return requiredPermissions.some(perm => user.permissions.map(userPerm => userPerm.id).includes(perm))
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
    initialLoadFinished
  }

  return (
    <UserContext.Provider value={userValue}>
      {initialLoadFinished && children}
    </UserContext.Provider>
  )
}