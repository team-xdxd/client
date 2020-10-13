import styles from './index.module.css'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { LoadingContext } from '../../context'
import urlUtils from '../../utils/url'
import billingApi from '../../server-api/billing'

// Components
import AuthContainer from '../common/containers/auth-container'
import SignupForm from './signup-form'
import ProvidersAuth from '../common/containers/providers-auth'

const Signup = () => {

  const [shareInviteCode, setShareInviteCode] = useState(undefined)
  const [priceData, setPriceData] = useState(undefined)
  const { setIsLoading } = useContext(LoadingContext)

  useEffect(() => {
    const { inviteCode } = urlUtils.getQueryParameters()
    if (inviteCode) {
      setShareInviteCode(inviteCode)
    }

    if (!inviteCode) {
      const { priceId } = urlUtils.getQueryParameters()
      if (priceId) {
        getPlaData(priceId as string)
      } else {
        getPlaData()
      }
    }
  }, [])

  const getPlaData = async (priceId = process.env.STRIPE_DEFAULT_SIGNUP_PRICE) => {
    try {
      setIsLoading(true)
      const { data } = await billingApi.getPriceById(priceId)
      setPriceData(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className={`${styles.container} container-centered`}>
      <AuthContainer
        title='Get started for FREE today'
        subtitle='No credit card required - 10 day free trial'
      >
        <SignupForm inviteCode={shareInviteCode} priceData={priceData} />
        <div className={styles.or}>OR</div>
        <ProvidersAuth inviteCode={shareInviteCode} priceData={priceData}/>
      </AuthContainer>
      {!shareInviteCode && <p className='nav-text'>Already have an account? <Link href='/login'><span>Log In</span></Link></p>}
    </main>
  )
}

export default Signup
