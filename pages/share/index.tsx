import Head from 'next/head'

// Components
import ShareLayout from '../../components/common/layouts/share-layout'
import ShareMain from '../../components/share'

const AssetsPage = () => (
  <>
    <Head>
      <title>Assets</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ShareLayout>
      <ShareMain />
    </ShareLayout>
  </>
)

export default AssetsPage
