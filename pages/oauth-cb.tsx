import { useEffect, useContext } from 'react'
import Router from 'next/router'
import { UserContext } from '../context'
import authApi from '../server-api/auth'
import cookiesUtil from '../utils/cookies'
import urlUtils from '../utils/url'

// Simple redirect page
const OauthCbPage = () => {

  const { fetchUser } = useContext(UserContext)
  useEffect(() => {
    // TODO: Include state string verification
    const { code } = urlUtils.getQueryParameters()
    signIn(decodeURIComponent(code as string))
  }, [])

  const signIn = async (accessCode) => {
    try {
      const provider = cookiesUtil.get('oauthProvider')
      const cookieInviteCode = cookiesUtil.get('inviteCode')
      let inviteCode
      // Check if inviteCode is valid
      if (cookieInviteCode && cookieInviteCode !== 'undefined') {
        inviteCode = cookieInviteCode
      }
      const { data } = await authApi.signIn(provider, accessCode, { inviteCode })
      cookiesUtil.setUserJWT(data.token)
      fetchUser()
    } catch (err) {
      console.log(err)
      fetchUser(true)
    }
  }

  return (
    <div className="container">
      {/* TODO: Replace with prettier loading indicator */}
      Loading...
    </div>
  )
}

export default OauthCbPage
