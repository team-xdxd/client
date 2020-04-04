import Head from 'next/head'

// Components
import MainLayout from '../../components/common/main-layout'
import Create from '../../components/main/create'

const CreatePage = () => (
  <>
    <Head>
      <title>Create</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <Create />
    </MainLayout>
  </>
)

export default CreatePage
