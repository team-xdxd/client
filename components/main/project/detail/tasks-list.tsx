import styles from './tasks-list.module.css'
import { Utilities, ProjectTypes, ItemFields } from '../../../../assets'

const TasksList = ({ tasks }) => {

  return (
    <div className={styles.container}>
      <div>
        <h3>Tasks</h3>
        <span></span>
      </div>
      {/* TODO: Progress bar */}
      <div>

      </div>
      <ul>
        {tasks?.map((task, index) => (
          <li key={index}>
            <img src={ProjectTypes.task} />
            <div>
              <span>{task.name}</span>
              <div className={styles.detail}>
                <img src={ItemFields.date} />
                <span>{`${task.endDate}`}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.add} onClick={() => toggleActiveInput('campaign')}>
        <img src={Utilities.add} />
        <span>Add Task</span>
      </div>
    </div>
  )
}

export default TasksList