import styles from './tasks-list.module.css'
import { Utilities, ProjectTypes, ItemFields, Navigation } from '../../../../assets'
import { useState } from 'react'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'
import { Line } from 'rc-progress'
import Router from 'next/router'

// Components
import TaskInput from '../../../common/inputs/task-input'
import Button from '../../../common/buttons/button'
import Dropdown from '../../../common/inputs/dropdown'

const TasksList = ({ tasks = [], createTask, removeTask, updateTask }) => {

  const [inputVisible, setInputVisible] = useState(false)
  const [date, setDate] = useState()
  const [name, setName] = useState('')

  const [hoverIndex, setHoverIndex] = useState(-1)
  const [visibleTaskDateIndex, setVisibleTaskDateIndex] = useState(-1)
  const [visibleMoreIndex, setVisibleMoreIndex] = useState(-1)

  const sendCreateTask = () => {
    createTask({ name, endDate: date })
  }

  const handleDayClick = (day, { selected }) => {
    const endDate = selected ? null : day
    updateTask(visibleTaskDateIndex, { endDate })
    setHoverIndex(-1)
    setVisibleTaskDateIndex(-1)
  }

  const toggleVisibleTaskDateIndex = (index) => {
    if (visibleTaskDateIndex === index) return setVisibleTaskDateIndex(-1)
    setVisibleTaskDateIndex(index)
  }

  const toggleVisibleMoreIndex = (index) => {
    if (visibleMoreIndex === index) return setVisibleMoreIndex(-1)
    setVisibleMoreIndex(index)
  }

  const completedTasks = tasks.filter(task => task.status === 'comleted')
  const completedPercentage = tasks.length > 0 ? completedTasks / tasks.length * 100 : 0
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Tasks</h2>
        <span>{tasks.length} tasks</span>
      </div>
      <div className={styles.percentage}>
        <Line
          percent={completedPercentage}
          strokeWidth="1.7"
          trailWidth="1.7"
          strokeColor={'#10bda5'}
          trailColor={'#f6efe4'}
          strokeLinecap="square"
        />
      </div>
      <div className={styles['percentage-value']}>
        {`${completedPercentage} %`}
      </div>
      <ul className={styles.list}>
        {tasks?.map((task, index) => (
          <li
            key={index}
            onMouseOver={() => setHoverIndex(index)}
            onMouseOut={() => setHoverIndex(-1)}
          >
            <img src={ProjectTypes.task} />
            <div className={styles['task-content']}>
              <span onClick={() => Router.replace(`/main/tasks/${task.id}`)}>{task.name}</span>
              <div className={styles.detail}>
                <img src={Navigation.scheduleBlack} />
                <span>{`${task.endDate ? format(new Date(task.endDate), 'EEE MMM d') : 'No date'}`}</span>
              </div>
            </div>
            <div className={`${styles['item-actions']} ${
              (visibleTaskDateIndex === index ||
                hoverIndex === index ||
                visibleMoreIndex === index)
              && styles.visible}`}>
              <img src={Utilities.assignMember} />
              <img src={Navigation.schedulePrimary} onClick={() => toggleVisibleTaskDateIndex(index)} />
              <img src={Utilities.more} onClick={() => toggleVisibleMoreIndex(index)} />
            </div>
            {visibleTaskDateIndex === index &&
              <div className={styles['item-date']}>
                <DayPicker
                  selectedDays={task.endDate && new Date(task.endDate)}
                  onDayClick={handleDayClick} />
              </div>
            }
            {visibleMoreIndex === index &&
              <div className={styles['item-more']}>
                <Dropdown
                  options={[{ label: 'Delete' }]}
                  onClick={() => {
                    setVisibleMoreIndex(-1)
                    removeTask(index)
                  }}
                />
              </div>
            }
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
              disabled={!name}
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
          <img src={Utilities.addLight} />
          <span>Add Task</span>
        </div>
      }

    </div>
  )
}

export default TasksList