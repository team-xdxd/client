import Head from 'next/head'

import { CALENDAR_ACCESS } from '../../../../constants/permissions'

// Components
import MainLayout from '../../../../components/common/layouts/main-layout'
import CampaignDetail from '../../../../components/main/campaign/detail'

const CampaignDetailPage = () => (
  <>
    <Head>
      <title>Campaign</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout requiredPermissions={[CALENDAR_ACCESS]}>
      <CampaignDetail />
    </MainLayout>
  </>
)

export default CampaignDetailPage
