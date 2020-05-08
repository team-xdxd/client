import styles from './schedule-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'
import { format, endOfMonth, startOfMonth, addDays } from 'date-fns'

import { ProjectTypes } from '../../../assets'

// Components
import SubHeader from '../../common/layouts/sub-header'
import NavDropdownButton from '../../common/buttons/nav-dropdown-button'
import CreateOverlay from '../create-overlay'

const ScheduleSubHeader = ({ openCreateOVerlay, currentDate, setCurrentDate }) => {

  const dropdownOptions = [
    {
      label: 'Campaign',
      onClick: () => openCreateOVerlay('campaign'),
      icon: ProjectTypes.campaign
    },
    {
      label: 'Project',
      onClick: () => openCreateOVerlay('project'),
      icon: ProjectTypes.project
    },
    {
      label: 'Task',
      onClick: () => openCreateOVerlay('task'),
      icon: ProjectTypes.task
    }
  ]

  const setNextMonth = () => {
    setCurrentDate(addDays(endOfMonth(currentDate), 1))
  }

  const setPreviousMonth = () => {
    setCurrentDate(addDays(startOfMonth(currentDate), -1))
  }

  // TODO: Change page title to date
  return (
    <SubHeader pageTitle={currentDate && format(currentDate, 'MMM yyyy')} inputDisabled={true}>
      <div className={styles['header-additional']}>
        <div onClick={setPreviousMonth}>
          {'<'}
        </div>
        <div onClick={setNextMonth}>
          {'>'}
        </div>
      </div>
      <NavDropdownButton
        text='Create New'
        onClick={() => openCreateOVerlay()}
        options={dropdownOptions}
      />
    </SubHeader>
  )
}

export default ScheduleSubHeader
