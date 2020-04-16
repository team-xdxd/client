import Head from 'next/head'

// Components
import MainLayout from '../../components/common/layouts/main-layout'
import Overview from '../../components/main/overview'

const OverviewPage = () => (
  <>
    <Head>
      <title>Overview</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <Overview />
    </MainLayout>
  </>
)

export default OverviewPage
