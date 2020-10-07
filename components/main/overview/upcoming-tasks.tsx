import styles from './upcoming-tasks.module.css'

// Components
import UpcomingTasksItem from './upcoming-tasks-item'

const UpcomingTasks = ({ tasks = [] }) => (
  <div className={`${styles.container}`}>
    <h4>My Upcoming Tasks</h4>
    {tasks.length > 0 ?
      <ul>
        {tasks.map((task, index) => (
          <UpcomingTasksItem
            key={index}
            date={task.endDate}
            name={task.name}
            status={task.status}
            projectName={task.project?.name}
            detailUrl={`/main/tasks/${task.id}`}
            projectDetailUrl={`/main/projects/${task.project?.id}`}
          />
        ))}
      </ul>
      :
      <span className={styles.empty}>
        {`No tasks`}
      </span>
    }
  </div>
)

export default UpcomingTasks
