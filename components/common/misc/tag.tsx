import { capitalCase } from 'change-case'
import styles from './tag.module.css'

const Tag = ({ tag, canRemove = false, removeFunction = () => { }, altColor = '' }) => (
  <div className={`${styles.container} ${altColor && styles[`alt-color-${altColor}`]}`}>
    <span >{tag}</span>
    {canRemove &&
      <span onClick={removeFunction} className={styles.remove}>x</span>
    }
  </div>
)

export default Tag
