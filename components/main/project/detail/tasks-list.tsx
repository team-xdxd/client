import styles from './tasks-list.module.css'
import { Utilities, ProjectTypes, Navigation } from '../../../../assets'
import { useState, useRef } from 'react'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'
import { Line } from 'rc-progress'
import Router from 'next/router'

// Components
import TaskInput from '../../../common/inputs/task-input'
import Button from '../../../common/buttons/button'
import Dropdown from '../../../common/inputs/dropdown'
import ConfirmModal from '../../../common/modals/confirm-modal'
import SearchableUserList from '../../../common/user/searchable-user-list'
import UserPhoto from '../../../common/user/user-photo'

const TasksList = ({ tasks = [], createTask, removeTask, updateTask, replaceTaskAssigned }) => {

  const [inputVisible, setInputVisible] = useState(false)
  const [date, setDate] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [name, setName] = useState('')

  const [hoverIndex, setHoverIndex] = useState(-1)
  const [visibleTaskDateIndex, setVisibleTaskDateIndex] = useState(-1)
  const [visibleMoreIndex, setVisibleMoreIndex] = useState(-1)
  const [visibleMemberIndex, setVisibleMemberIndex] = useState(-1)

  const [activeIndex, setActiveIndex] = useState(-1)

  const sendCreateTask = () => {
    createTask({ name, endDate: date, selectedUser })
    setDate(null)
    setName('')
    setInputVisible(false)
  }

  const toggleTaskState = (index) => {
    let newStatus
    if (tasks[index].status !== 'completed') {
      newStatus = 'completed'
    } else {
      newStatus = 'draft'
    }
    updateTask(index, { status: newStatus })
  }

  const handleDayClick = (day, { selected }) => {
    const endDate = selected ? null : day
    updateTask(visibleTaskDateIndex, { endDate })
    setHoverIndex(-1)
    setVisibleTaskDateIndex(-1)
  }

  const handleUserSelection = (user) => {
    if (user.id === tasks[visibleMemberIndex].users[0]?.id) replaceTaskAssigned(visibleMemberIndex, undefined)
    else replaceTaskAssigned(visibleMemberIndex, user)
    setVisibleMemberIndex(-1)
    setHoverIndex(-1)
  }

  const wrapperRefMore = useRef(null)

  const handleClickOutsideMore = (event) => {
    const className = event.target.getAttribute('class')
    if (wrapperRefMore.current && !wrapperRefMore.current.contains(event.target) && className !== 'more-icon') {
      setVisibleMoreIndex(-1)
    }
  }

  const setVisibleMoreIndexAct = (e, index) => {
    e.stopPropagation()
    const newIndex = index === visibleMoreIndex ? -1 : index
    setVisibleMoreIndex(newIndex)
    if (index !== -1) {
      document.addEventListener("mousedown", handleClickOutsideMore);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMore);
    }
  }

  const wrapperRefDate = useRef(null)

  const handleClickOutsideDate = (event) => {
    const className = event.target.getAttribute('class')
    if (wrapperRefDate.current && !wrapperRefDate.current.contains(event.target) && className !== 'schedule-icon') {
      setVisibleTaskDateIndex(-1)
    }
  }

  const setVisibleDateIndexAct = (e, index) => {
    e.stopPropagation()
    const newIndex = index === visibleTaskDateIndex ? -1 : index
    setVisibleTaskDateIndex(newIndex)
    if (newIndex !== -1) {
      document.addEventListener("mousedown", handleClickOutsideDate);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDate);
    }
  }

  const wrapperRefMember = useRef(null)

  const handleClickOutsideMember = (event) => {
    const className = event.target.getAttribute('class')
    if (wrapperRefMember.current && !wrapperRefMember.current.contains(event.target) && className !== 'member-icon') {
      setVisibleMemberIndex(-1)
    }
  }

  const setVisibleMemberIndexAct = (e, index) => {
    e.stopPropagation()
    const newIndex = index === visibleMemberIndex ? -1 : index
    setVisibleMemberIndex(newIndex)
    if (index !== -1) {
      document.addEventListener("mousedown", handleClickOutsideMember);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMember);
    }
  }

  const completedTasks = tasks.filter(task => task.status === 'completed')
  const completedPercentage = tasks.length > 0 ? completedTasks.length / tasks.length * 100 : 0

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Tasks</h2>
        <span>{tasks.length} task(s)</span>
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
        {`${completedPercentage.toFixed()} %`}
      </div>
      <ul className={styles.list}>
        {tasks?.map((task, index) => (
          <li
            className={styles[task.status]}
            key={index}
            onMouseOver={() => setHoverIndex(index)}
            onMouseOut={() => setHoverIndex(-1)}
          >
            <img src={
              task.status === 'completed' ?
                Utilities.radioButtonEnabled
                :
                Utilities.radioButtonNormal
            }
              className={styles['task-status']}
              onClick={() => toggleTaskState(index)}
            />
            <div className={styles['task-content']}>
              <span onClick={() => Router.replace(`/main/tasks/${task.id}`)}>{task.name}</span>
              <div className={styles.detail}>
                <img src={Navigation.scheduleBlack} />
                <span>{`${task.endDate ? format(new Date(task.endDate), 'EEE MMM d') : 'No date'}`}</span>
              </div>
            </div>
            <div className={`${styles['item-actions']} ${(visibleTaskDateIndex === index ||
              hoverIndex === index ||
              visibleMoreIndex === index ||
              visibleMemberIndex === index)
              && styles.visible}`}>
              <div className='member-icon' onClick={(e) => setVisibleMemberIndexAct(e, index)}>
                <UserPhoto noPhoto={Utilities.assignMember} sizePx={16}
                  photoUrl={task.users[0] && (task.users[0].profilePhoto || Utilities.memberProfile)}
                  tooltipId={`user-task-${task.id}`} tooltipText={task.users[0]?.name} />
              </div>
              <img className='schedule-icon' src={Navigation.schedulePrimary}
                onClick={(e) => setVisibleDateIndexAct(e, index)} />
              <img className='more-icon' src={Utilities.more}
                onClick={(e) => setVisibleMoreIndexAct(e, index)} />
            </div>
            {visibleTaskDateIndex === index &&
              <div className={styles['item-date']} ref={wrapperRefDate}>
                <DayPicker
                  selectedDays={task.endDate && new Date(task.endDate)}
                  onDayClick={handleDayClick} />
              </div>
            }
            {visibleMoreIndex === index &&
              <div className={styles['item-more']} ref={wrapperRefMore}>
                <Dropdown
                  options={
                    [{
                      label: 'Delete', onClick: () => {
                        setActiveIndex(index)
                      }
                    }]}
                />
              </div>
            }
            {visibleMemberIndex === index &&
              <div className={styles['item-member']} ref={wrapperRefMember}>
                <SearchableUserList onUserSelected={handleUserSelection} selectedList={[task.users[0]?.id]} />
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
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
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
      <ConfirmModal
        closeModal={() => setActiveIndex(-1)}
        confirmAction={() => {
          removeTask(activeIndex)
          setVisibleMoreIndex(-1)
          setActiveIndex(-1)
          setVisibleMemberIndex(-1)
          setVisibleTaskDateIndex(-1)
        }}
        confirmText={'Delete'}
        message={
          <span>
            Are you sure you want to &nbsp;<strong>Delete</strong>&nbsp; 1 task?
        </span>
        }
        modalIsOpen={activeIndex !== -1}
      />
    </div>
  )
}

export default TasksList