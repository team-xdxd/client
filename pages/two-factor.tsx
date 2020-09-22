import Head from 'next/head'

// Components
import AuthLayout from '../components/common/layouts/auth-layout'
import TwoFactor from '../components/two-factor'

const TwoFactorPage = () => (
  <>
    <Head>
      <title>Enter Confirmation Code</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthLayout>
      <TwoFactor />
    </AuthLayout>
  </>
)

export default TwoFactorPage
