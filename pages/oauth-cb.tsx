import { useEffect, useContext } from 'react'
import Router from 'next/router'
import { UserContext } from '../context'
import authApi from '../server-api/auth'
import cookiesUtil from '../utils/cookies'
import urlUtils from '../utils/url'
import toastUtils from '../utils/toast'

// Components
import Spinner from '../components/common/spinners/spinner'

// Simple redirect page
const OauthCbPage = () => {

  const { fetchUser } = useContext(UserContext)
  useEffect(() => {
    // TODO: Include state string verification
    const { code } = urlUtils.getQueryParameters()
    signIn(decodeURIComponent(code as string))
  }, [])

  const signIn = async (accessCode) => {
    const provider = cookiesUtil.get('oauthProvider')
    const cookieInviteCode = cookiesUtil.get('inviteCode')
    try {
      let inviteCode
      // Check if inviteCode is valid
      if (cookieInviteCode && cookieInviteCode !== 'undefined') {
        inviteCode = cookieInviteCode
      }
      const { data } = await authApi.signIn(provider, accessCode, { inviteCode })
      cookiesUtil.setUserJWT(data.token)
      fetchUser()
    } catch (err) {
      if (err.response?.data?.message) toastUtils.error(err.response.data.message)
      console.log(err)
      if (cookieInviteCode && cookieInviteCode !== 'undefined') {
        Router.replace(`/signup?inviteCode=${cookieInviteCode}`)
      } else {
        Router.replace('/login')
      }
    } finally {
      cookiesUtil.remove('inviteCode')
    }
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <Spinner />
    </div>
  )
}

export default OauthCbPage
