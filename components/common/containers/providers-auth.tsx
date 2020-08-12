import styles from './providers-auth.module.css';
import { LoginImg } from '../../../assets'

import authApi from '../../../server-api/auth'
import cookiesUtil from '../../../utils/cookies'

// Components
import ProviderAuthButton from '../buttons/provider-auth-button'

let ProvidersAuth = ({ inviteCode }) => {

  const initiateOAuth = async (provider) => {
    try {
      const { data } = await authApi.getUrl(provider)
      cookiesUtil.set('oauthProvider', provider)
      cookiesUtil.set('inviteCode', inviteCode)
      window.location.replace(data.url)
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <ProviderAuthButton
          provider='google'
          icon={LoginImg.google}
          onClick={() => initiateOAuth('google')}
        />
      </div>
    </div>
  )
}

export default ProvidersAuth
