import styles from './user-photo.module.css'
import { Utilities } from '../../../assets'

const UserPhoto = ({ photoUrl = '', extraClass = '' }) => (
  <img className={`${photoUrl ? styles.current : styles['no-photo']} ${extraClass}`} src={photoUrl || Utilities.memberProfile} />
)

export default UserPhoto
