import Head from 'next/head'

import { CALENDAR_ACCESS } from '../../constants/permissions'

// Components
import MainLayout from '../../components/common/layouts/main-layout'
import Schedule from '../../components/main/schedule'

const SchedulePage = () => (
  <>
    <Head>
      <title>Schedule</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout requiredPermissions={[CALENDAR_ACCESS]}>
      <Schedule />
    </MainLayout>
  </>
)

export default SchedulePage
