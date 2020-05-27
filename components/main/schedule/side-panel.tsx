import styles from './side-panel.module.css'
import itemStatus from '../../../resources/data/item-status.json'
import projectTypes from '../../../resources/data/project-types.json'
import { ProjectType, ProjectTypes, ProjectTypeChannel, Status } from '../../../assets'
import { capitalCase } from 'change-case'

// Components
import CalendarInput from './common/calendar-input'

const statusOptions = [
  'all',
  ...itemStatus
]

const typeOptions = [
  'campaigns',
  'tasks',
  ...projectTypes
]

const SidePanel = ({ currentDate, setCurrentDate, filters, setFilters, activeView}) => {

  const Filter = ({ icon, text, onClick, selected }) => (
    <li onClick={onClick} className={`${styles.item} ${selected && styles.selected}`}>
      <img src={icon} />
      <span>{text}</span>
    </li>
  )

  return (
    <section>
      <CalendarInput
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        type={activeView}
      />
      <div className={styles['filters-container']}>
        <div className={styles.status}>
          <h3>Status</h3>
          <ul className={styles.list}>
            {statusOptions.map((status) => {
              let selected = filters.status?.value === status
              if (status === 'all' && !filters.status) selected = true
              const postFix = selected ? '' : 'Light'
              let icon = Status[`${status}${postFix}`]
              let newStatus = { label: capitalCase(status), value: status }
              if (status === 'all') newStatus = null
              let onClick = () => setFilters({ ...filters, status: newStatus })
              return <Filter text={capitalCase(status)} icon={icon} onClick={onClick} selected={selected} />
            })}
          </ul>
        </div>
        <div className={styles.type}>
          <h3>Type</h3>
          <ul className={styles.list}>
            {typeOptions.map((type) => {
              const selected = filters.type?.value === type
              const postFix = selected ? '' : 'Light'
              let icon = ProjectType[`${type}${postFix}`] || ProjectTypes[`${type.substring(0, type.length - 1)}${postFix}`]
                || ProjectTypeChannel[`${type}${postFix}`]
              let onClick = () => setFilters({ ...filters, type: { label: capitalCase(type), value: type } })
              return <Filter text={capitalCase(type)} icon={icon} onClick={onClick} selected={selected} />
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SidePanel
