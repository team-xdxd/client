import { capitalCase } from 'change-case'
import styles from './tag.module.css'

const Tag = ({ tag, canRemove = false, removeFunction = () => { } }) => (
  <div className={`${styles.container}`}>
    <span >{tag}</span>
    {canRemove &&
      <span onClick={removeFunction} className={styles.remove}>x</span>
    }
  </div>
)

export default Tag
