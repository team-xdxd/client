import Head from 'next/head'

import Login from '../components/login'

const LoginPage = () => (
  <>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Login />
  </>
)

export default LoginPage
