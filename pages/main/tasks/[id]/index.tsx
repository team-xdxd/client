import Head from 'next/head'

// Components
import MainLayout from '../../../../components/common/layouts/main-layout'
import TaskDetail from '../../../../components/main/task/detail'

const TaskDetailPage = () => (
  <>
    <Head>
      <title>Task</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <TaskDetail />
    </MainLayout>
  </>
)

export default TaskDetailPage
