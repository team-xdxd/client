import Head from 'next/head'

// Components
import MainLayout from '../../../../components/common/layouts/main-layout'
import UserSettings from '../../../../components/main/user-settings'

const UserSettingsPage = () => (
  <>
    <Head>
      <title>User Settings</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainLayout>
      <UserSettings />
    </MainLayout>
  </>
)

export default UserSettingsPage
