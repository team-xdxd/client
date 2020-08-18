import styles from './conversation.module.css'

// Components
import Comment from './comment'
import CommentInput from './comment-input'

const Conversation = ({ comments, addComment, isLoading }) => {

  return (
    <div className={`${styles.container} ${isLoading && 'loadable'}`}>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <Comment
              content={comment.content}
              mentions={comment.mentions}
              createdAt={comment.createdAt}
              user={comment.user}
            />
          </li>
        ))}
      </ul>
      <CommentInput onSubmit={addComment} style='reply' />
    </div>
  )
}

export default Conversation