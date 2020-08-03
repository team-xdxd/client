import Head from 'next/head'

// Components
import AuthLayout from '../components/common/layouts/auth-layout'
import Payment from '../components/payment'

const PaymentPage = () => (
  <>
    <Head>
      <title>Payment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthLayout>
      <Payment />
    </AuthLayout>
  </>
)

export default PaymentPage
