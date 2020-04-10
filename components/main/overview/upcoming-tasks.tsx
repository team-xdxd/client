import styles from './upcoming-tasks.module.css'

// Components
import UpcomingTasksItem from './upcoming-tasks-item'

const UpcomingTasks = ({ tasks = [] }) => (
  <div className={`${styles.container}`}>
    <h4>My Upcoming Tasks</h4>
    <ul>
      {tasks.map((task, index) => (
        <UpcomingTasksItem
          date={task.endDate}
          name={task.name}
          status={task.status}
        />
      ))}
    </ul>
  </div>
)

export default UpcomingTasks
