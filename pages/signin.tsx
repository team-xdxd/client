import Head from 'next/head'

import Login from '../components/signin'

const LoginPage = () => (
  <>
    <Head>
      <title>Sign In</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Login />
  </>
)

export default LoginPage
