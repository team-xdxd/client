import Head from 'next/head'
import Link from 'next/link'

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Link href="/login">
        <a>Login</a>
      </Link>

    </main>
  </div>
)

export default Home
