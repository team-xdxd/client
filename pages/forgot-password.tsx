import Head from 'next/head'

// Components
import AuthLayout from '../components/common/layouts/auth-layout'
import ForgotPassword from '../components/forgot-password'

const ForgotPasswordPage = () => (
  <>
    <Head>
      <title>Forgot Password</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  </>
)

export default ForgotPasswordPage
