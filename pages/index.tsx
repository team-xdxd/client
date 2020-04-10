import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import AuthButton from '../components/common/auth-button'

import userApi from '../server-api/user'

import requestsUtils from '../utils/requests'
import cookiesUtils from '../utils/cookies'

const Home = () => {

  const [user, setUser] = useState({
    id: '',
    email: '',
    name: '',
    phone: '',
    network: '',
    team: {
      id: '',
      company: '',
      companySize: ''
    }
  })

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const token = cookiesUtils.get('jwt')
    if (token) {
      requestsUtils.setAuthToken(token)
      const { data } = await userApi.getUserData()
      setUser(data)
    }
  }

  return (
    <div className="container">     
    </div>
  )
}

export default Home
