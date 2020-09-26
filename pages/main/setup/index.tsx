import Head from 'next/head'

// Components
import AuthLayout from '../../../components/common/layouts/auth-layout'
import SetupMain from '../../../components/main/setup'

const AssetsPage = () => (
  <>
    <Head>
      <title>Account Setup</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthLayout>
      <SetupMain />
    </AuthLayout>
  </>
)

export default AssetsPage
