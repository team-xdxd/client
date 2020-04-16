import Head from 'next/head'

// Components
import MainLayout from '../../../../components/common/layouts/main-layout'
import CampaignDetail from '../../../../components/main/campaign/detail'

const CampaignDetailPage = () => (
  <>
    <Head>
      <title>Campaign</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <CampaignDetail />
    </MainLayout>
  </>
)

export default CampaignDetailPage
