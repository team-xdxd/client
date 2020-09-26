import styles from './user-photo.module.css'
import { Utilities } from '../../../assets'
import ReactTooltip from 'react-tooltip'

const UserPhoto = ({ photoUrl = '', extraClass = '', sizePx = 27, noPhoto = Utilities.memberProfile, tooltipId = '', tooltipText = '' }) => (
  <>
    <img data-tip data-for={tooltipId} className={`${photoUrl ? styles.current : styles['no-photo']} ${extraClass}`} src={photoUrl || noPhoto}
      style={{ width: sizePx, height: sizePx }} />
    {tooltipText &&
      <ReactTooltip id={tooltipId} delayShow={500} effect='solid'>{tooltipText}</ReactTooltip>
    }
  </>
)

export default UserPhoto
