import { capitalCase } from 'change-case'
import styles from './type.module.css'
import { ProjectTypeChannel, ProjectTypes, ProjectType } from '../../../assets'


const Type = ({ item }) => {

  let type
  let socialChannel
  if (item.itemType === 'campaign') {
    type = item.itemType
  }
  else if (item.itemType === 'project') {
    type = item.type
    if (type === 'social') {
      socialChannel = item.channel || 'social'
    }
  }
  else {
    type = item.itemType
  }

  let icon = ProjectTypes[type]
  if (type !== 'campaign' && type !== 'task') {
    icon = ProjectType[type]
  }
  return (
    <div className={styles.type}>
      <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
      <span>
        {capitalCase(type)}
      </span>
    </div>
  )
}

export default Type
