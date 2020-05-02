import Head from 'next/head'

// Components
import MainLayout from '../../components/common/layouts/main-layout'
import Schedule from '../../components/main/schedule'

const SchedulePage = () => (
  <>
    <Head>
      <title>Schedule</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <Schedule />
    </MainLayout>
  </>
)

export default SchedulePage
