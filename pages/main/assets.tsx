import Head from 'next/head'

import { ASSET_ACCESS } from '../../constants/permissions'

// Components
import MainLayout from '../../components/common/layouts/main-layout'
import AssetsLibrary from '../../components/main/assets-library'

const AssetsPage = () => (
  <>
    <Head>
      <title>Assets</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout requiredPermissions={[ASSET_ACCESS]}>
      <AssetsLibrary />
    </MainLayout>
  </>
)

export default AssetsPage
