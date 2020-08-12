import styles from './index.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Components
import AuthContainer from '../common/containers/auth-container'
import SignupForm from './signup-form'
import ProvidersAuth from '../common/containers/providers-auth'

const Signup = () => {

  const [inviteCode, setInviteCode] = useState('')
  useEffect(() => {
    const splitSearch = window.location.search?.split('inviteCode=')
    if (splitSearch[1]) {
      setInviteCode(splitSearch[1])
    }
  }, [])

  return (
    <main className={`${styles.container} container-centered`}>
      <AuthContainer
        title='Get started for FREE today'
        subtitle='No credit card required - 10 day free trial'
      >
        <SignupForm inviteCode={inviteCode}/>
        <div className={styles.or}>OR</div>
        <ProvidersAuth inviteCode={inviteCode}/>
      </AuthContainer>
      {!inviteCode && <p className='nav-text'>Already have an account? <Link href='/login'><span>Log In</span></Link></p>}
    </main>
  )
}

export default Signup
