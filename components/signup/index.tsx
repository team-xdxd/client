import styles from './index.module.css'
import Link from 'next/link'

// Components
import AuthContainer from '../common/containers/auth-container'
import SignupForm from './signup-form'
import ProvidersAuth from '../common/containers/providers-auth'

const Signup = () => {

  return (
    <main className={`${styles.container} container-centered`}>
      <AuthContainer
        title='Get started for FREE today'
        subtitle='No credit card required - 10 day free trial'
      >
        <SignupForm />
        <div className={styles.or}>OR</div>
        <ProvidersAuth />
      </AuthContainer>
      <p className='nav-text'>Already have an account? <Link href='/login'><span>Log In</span></Link></p>
    </main>
  )
}

export default Signup
