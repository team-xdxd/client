import styles from './side-panel.module.css'
import itemStatus from '../../../resources/data/item-status.json'
import projectTypes from '../../../resources/data/project-types.json'
import { ProjectType, ProjectTypes, ProjectTypeChannel, Status } from '../../../assets'
import { capitalCase } from 'change-case'
import update from 'immutability-helper'

// Components
import CalendarInput from './common/calendar-input'

const statusOptions = [
  ...itemStatus
]

const typeOptions = [
  'campaigns',
  'tasks',
  ...projectTypes
]

const SidePanel = ({ currentDate, setCurrentDate, filters, setFilters, activeView }) => {

  const Filter = ({ icon, text, onClick, selected }) => (
    <li onClick={onClick} className={`${styles.item} ${selected && styles.selected}`}>
      <img src={icon} />
      <span>{text}</span>
    </li>
  )

  const onFilterClick = (type, value) => {
    const typeIndex = filters[type]?.findIndex(type => type.value === value)

    if (typeIndex === undefined || typeIndex === -1) {
      let typeUpdateVal
      let newType = { label: capitalCase(value), value }
      if (!filters[type]) {
        typeUpdateVal = { $set: [newType] }
      } else {
        typeUpdateVal = { $push: [newType] }
      }
      setFilters(update(filters, {
        [type]: typeUpdateVal
      }))
    } else {
      setFilters(update(filters, {
        [type]: {
          $splice: [[typeIndex, 1]]
        }
      }))
    }
  }

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
              let selected = filters.status && (filters.status?.findIndex(statusObj => statusObj.value === status) !== -1)
              const postFix = selected ? '' : 'Light'
              let icon = Status[`${status}${postFix}`]
              let onClick = () => onFilterClick('status', status)
              return <Filter text={capitalCase(status)} icon={icon} onClick={onClick} selected={selected} />
            })}
          </ul>
        </div>
        <div className={styles.type}>
          <h3>Type</h3>
          <ul className={styles.list}>
            {typeOptions.map((type) => {
              const selected = filters.type && (filters.type?.findIndex(typeObj => typeObj.value === type) !== -1)
              const postFix = selected ? '' : 'Light'
              let icon = ProjectType[`${type}${postFix}`] || ProjectTypes[`${type.substring(0, type.length - 1)}${postFix}`]
                || ProjectTypeChannel[`${type}${postFix}`]
              let onClick = () => onFilterClick('type', type)
              return <Filter text={capitalCase(type)} icon={icon} onClick={onClick} selected={selected} />
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SidePanel
