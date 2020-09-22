import Head from 'next/head'

// Components
import Spinner from '../components/common/spinners/spinner'

const MainPage = () => (
  <>
    <Head>
      <title>Sparkfive</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <Spinner />
    </div>
  </>
)

export default MainPage
