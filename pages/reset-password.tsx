import Head from 'next/head'

// Components
import AuthLayout from '../components/common/auth-layout'
import ResetPassword from '../components/reset-password'

const ResetPasswordPage = () => (
  <>
    <Head>
      <title>Reset Password</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  </>
)

export default ResetPasswordPage
