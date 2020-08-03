import styles from './overview-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

import { ProjectTypes } from '../../../assets'

// Components
import SubHeader from '../../common/layouts/sub-header'
import NavDropdownButton from '../../common/buttons/nav-dropdown-button'
import StatusBadge from '../../common/misc/status-badge'

const OverviewSubHeader = ({ status = '', openCreateOVerlay }) => {

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

  return (
    <SubHeader pageTitle='Dashboard' inputDisabled={true}>
      <div className={styles['header-additional']}>
      </div>
      <NavDropdownButton
        text='Create New'
        onClick={() => openCreateOVerlay()}
        options={dropdownOptions}
      />
    </SubHeader>
  )
}

export default OverviewSubHeader
