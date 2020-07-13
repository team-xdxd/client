import Head from 'next/head'

// Components
import MainLayout from '../../components/common/layouts/share-layout'
import ShareMain from '../../components/share'

const AssetsPage = () => (
  <>
    <Head>
      <title>Assets</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <ShareMain />
    </MainLayout>
  </>
)

export default AssetsPage
