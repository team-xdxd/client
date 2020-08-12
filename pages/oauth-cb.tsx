import { useEffect, useContext } from 'react'
import Router from 'next/router'
import { UserContext } from '../context'
import authApi from '../server-api/auth'
import cookiesUtil from '../utils/cookies'

// Simple redirect page
const OauthCbPage = () => {

  const { fetchUser } = useContext(UserContext)
  useEffect(() => {
    // TODO: Include state string verification
    const queryParams = window.location.search.substr(1).split('&')
    const accessCode = decodeURIComponent(getFromQueryParams(queryParams, 'code'))
    signIn(accessCode)
  }, [])

  const signIn = async (accessCode) => {
    try {
      const provider = cookiesUtil.get('oauthProvider')
      const inviteCode = cookiesUtil.get('inviteCode')
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


const getFromQueryParams = (queryParams, parameter) => {
  let foundCode;
  queryParams.forEach(element => {
    if (element.includes(parameter + "=")) {
      foundCode = element.split(parameter + "=")[1];
    }
  });
  return foundCode;
}