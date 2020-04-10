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
      <Head>
        <title>Sparkfive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100vh', padding: 250 }}>
        {!user?.id ?
          <>
            <Link href="/signup">
              <AuthButton
                text='Sign Up'
                type='button'
              />
            </Link>
            <Link href="/login">
              <AuthButton
                text='Log In'
                type='button'
              />
            </Link>
          </>
          :
          <>
            <div>
              <h2>
                User:
            </h2>
              <div>
                <b>Id:</b> {user.id}
              </div>
              <div>
                <b>Email:</b> {user.email}
              </div>
              <div>
                <b>Name:</b> {user.name}
              </div>
              <div>
                <b>Phone:</b> {user.phone}
              </div>
              <h2>
                Team:
            </h2>
              <div>
                <b>Id:</b> {user.team.id}
              </div>
              <div>
                <b>Company:</b> {user.team.company}
              </div>
              <div>
                <b>Company Size:</b> {user.team.companySize}
              </div>
            </div>
            <Link href="/payment">
              <AuthButton
                text='Payment'
                type='button'
              />
            </Link>
            <AuthButton
              text='Log Out'
              type='button'
              onClick={() => {
                setUser(null)
                cookiesUtils.remove('jwt')
                requestsUtils.removeAuthToken()
              }}
            />
          </>
        }
      </main>
    </div>
  )
}

export default Home
