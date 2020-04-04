import Head from 'next/head'

// Components
import MainLayout from '../../../../components/common/main-layout'
import ProjectDetail from '../../../../components/main/project/detail'

const ProjectDetailPage = () => (
  <>
    <Head>
      <title>Project</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <ProjectDetail />
    </MainLayout>
  </>
)

export default ProjectDetailPage
