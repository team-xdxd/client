import styles from './tasks-list.module.css'
import { Utilities, ProjectTypes, ItemFields } from '../../../../assets'
import { useState } from 'react'
import { format } from 'date-fns'
import Router from 'next/router'

// Components
import TaskInput from '../../../common/inputs/task-input'
import Button from '../../../common/buttons/button'

const TasksList = ({ tasks, createTask, removeTask }) => {

  const [inputVisible, setInputVisible] = useState(false)
  const [date, setDate] = useState()
  const [name, setName] = useState('')

  const sendCreateTask = () => {
    createTask({ name, endDate: date })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Tasks</h2>
        <span>{tasks.length} tasks</span>
      </div>
      {/* TODO: Progress bar */}
      <div>

      </div>
      <ul className={styles.list}>
        {tasks?.map((task, index) => (
          <li key={index}>
            <img src={ProjectTypes.task} />
            <div className={styles['task-content']}>
              <span onClick={() => Router.replace(`/main/tasks/${task.id}`)}>{task.name}</span>
              <div className={styles.detail}>
                <img src={ItemFields.date} />
                <span>{`${task.endDate ? format(new Date(task.endDate), 'EEE MMM d') : 'No date'}`}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {inputVisible ?
        <div className={styles['new-container']}>
          <TaskInput
            date={date}
            setDate={setDate}
            name={name}
            setName={setName}
          />
          <div className={styles.actions}>
            <Button
              text='Add Task'
              type='button'
              styleType='primary'
              onClick={sendCreateTask}
            />
            <Button
              text='Cancel'
              type='button'
              styleType='secondary'
              onClick={() => setInputVisible(false)}
            />
          </div>
        </div>
        :
        <div className={styles.add} onClick={() => setInputVisible(true)}>
          <img src={Utilities.add} />
          <span>Add Task</span>
        </div>
      }

    </div>
  )
}

export default TasksList