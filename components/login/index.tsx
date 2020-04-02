import styles from './index.module.css'
import Link from 'next/link'

// Container
import AuthContainer from '../common/auth-container'
import LoginForm from './login-form'
import ProvidersAuth from '../common/providers-auth'

const SignIn = () => (
  <main className={`${styles.container} container-centered`}>
    <AuthContainer
      title='Welcome Back!'
      subtitle='Log In to Sparkfive'
    >
      <LoginForm />
      <div className={styles.or}>OR</div>
      <ProvidersAuth />
    </AuthContainer>
    <p className='nav-text'>Don't have an account? <Link href='/signup'><span>Sign Up</span></Link></p>
  </main>
)

export default SignIn
