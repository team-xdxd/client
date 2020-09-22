import Head from 'next/head'

import { CALENDAR_ACCESS } from '../../constants/permissions'

// Components
import MainLayout from '../../components/common/layouts/main-layout'
import Overview from '../../components/main/overview'

const OverviewPage = () => (
  <>
    <Head>
      <title>Overview</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout requiredPermissions={[CALENDAR_ACCESS]}>
      <Overview />
    </MainLayout>
  </>
)

export default OverviewPage
