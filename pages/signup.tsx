import Head from 'next/head'

// Components
import AuthLayout from '../components/common/layouts/auth-layout'
import Signup from '../components/signup'

const SignupPage = () => (
  <>
    <Head>
      <title>Sign Up</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthLayout>
      <Signup />
    </AuthLayout>
  </>
)

export default SignupPage
