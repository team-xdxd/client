import Head from 'next/head'

import { CALENDAR_ACCESS } from '../../../../constants/permissions'

// Components
import MainLayout from '../../../../components/common/layouts/main-layout'
import ProjectDetail from '../../../../components/main/project/detail'

const ProjectDetailPage = () => (
  <>
    <Head>
      <title>Project</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout requiredPermissions={[CALENDAR_ACCESS]}>
      <ProjectDetail />
    </MainLayout>
  </>
)

export default ProjectDetailPage
