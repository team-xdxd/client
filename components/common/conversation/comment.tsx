import styles from './comment.module.css'
import Highlighter from "react-highlight-words"
import { Utilities } from '../../../assets'
import { format } from 'date-fns'

// Components
import UserPhoto from '../user/user-photo'

const Comment = ({ content, mentions, createdAt, user }) => {

  const mentionNames = mentions.map(mention => `@${mention.name}`)

  return (
    <div className={styles.container}>
      <div className={styles['main-content']}>
        <UserPhoto sizePx={27} photoUrl={user.profilePhoto} extraClass={styles['author-img']} />
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