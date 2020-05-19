import styles from './search-item.module.css'
import Router from 'next/router'
import { ProjectType, ProjectTypeChannel, ProjectTypes } from '../../../assets'
import { capitalCase } from 'change-case'
import { format } from 'date-fns'
import Highlighter from "react-highlight-words"

const getItemDateKey = (item) => {
  switch (item.itemType) {
    case 'campaign':
      return 'endDate'
    case 'project':
      return 'publishDate'
    case 'task':
      return 'endDate'
    default:
      return
  }
}

const SearchItem = ({ item, term }) => {
  const dateKey = getItemDateKey(item)
  const date = item[dateKey]
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
    <li
      className={styles.item}
      onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}>
      <div className={styles.name}>
        <Highlighter
          highlightClassName={styles.highlight}
          searchWords={[term]}
          autoEscape={true}
          textToHighlight={item.name}
        />
      </div>
      <div className={styles.type}>
        <img src={socialChannel ? ProjectTypeChannel[socialChannel.toLowerCase()] : icon} />
        <span>
          {capitalCase(type)}
        </span>
      </div>
      <div className={styles.date}>
        {date && format(new Date(date), 'EEE d yyyy, MMM')}
      </div>
      <div className={styles.time}>
        {date && format(new Date(date), 'hh:mm a')}
      </div>
    </li>
  )
}

export default SearchItem

