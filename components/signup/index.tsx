import styles from './index.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import urlUtils from '../../utils/url'

// Components
import AuthContainer from '../common/containers/auth-container'
import SignupForm from './signup-form'
import ProvidersAuth from '../common/containers/providers-auth'

const Signup = () => {

  const [shareInviteCode, setShareInviteCode] = useState(undefined)
  useEffect(() => {
    const { inviteCode } = urlUtils.getQueryParameters()
    if (inviteCode) {
      setShareInviteCode(inviteCode)
    }
  }, [])

  return (
    <main className={`${styles.container} container-centered`}>
      <AuthContainer
        title='Get started for FREE today'
        subtitle='No credit card required - 10 day free trial'
      >
        <SignupForm inviteCode={shareInviteCode} />
        <div className={styles.or}>OR</div>
        <ProvidersAuth inviteCode={shareInviteCode} />
      </AuthContainer>
      {!shareInviteCode && <p className='nav-text'>Already have an account? <Link href='/login'><span>Log In</span></Link></p>}
    </main>
  )
}

export default Signup
