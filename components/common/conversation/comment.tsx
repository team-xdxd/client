import styles from './comment.module.css'
import Highlighter from "react-highlight-words"
import { Utilities } from '../../../assets'
import { format } from 'date-fns'

// Components

const Comment = ({ content, mentions, createdAt, user }) => {

  const mentionNames = mentions.map(mention => `@${mention.name}`)

  return (
    <div className={styles.container}>
      <div className={styles['main-content']}>
        <img src={Utilities.memberProfile} className={styles['author-img']} />
        <Highlighter
          highlightClassName={styles.mention}
          searchWords={mentionNames}
          autoEscape={true}
          textToHighlight={content}
        />
      </div>
      <div className={styles['author-date']}>
        <span>{user.name}</span>
        <span>{format(new Date(createdAt), 'MMM Mo p')}</span>
      </div>
    </div>
  )
}

export default Comment