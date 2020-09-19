import styles from './index.module.css'
import { UserContext } from '../../../../context'
import { useState, useContext, useEffect } from 'react'

// Components
import PhotoUpload from '../../../common/account/photo-upload'
import Basic from './basic'

const Profile = () => {

  const { user, setUser } = useContext(UserContext)

  return (
    <div className={styles.container}>
      {user &&
        <>
          <PhotoUpload userPhoto={user.profilePhoto} />
          <Basic email={user.email} name={user.name} provider={user.provider} />
        </>
      }
    </div>
  )
}

export default Profile