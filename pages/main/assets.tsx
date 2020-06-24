import Head from 'next/head'

// Components
import MainLayout from '../../components/common/layouts/main-layout'
import AssetsLibrary from '../../components/main/assets-library'

const AssetsPage = () => (
  <>
    <Head>
      <title>Assets</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <AssetsLibrary />
    </MainLayout>
  </>
)

export default AssetsPage
