import styles from './overview-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

import { GeneralImg } from '../../../assets'

// Components
import SubHeader from '../../common/sub-header'
import NavDropdownButton from '../../common/nav-dropdown-button'
import StatusBadge from '../../common/status-badge'

const OverviewSubHeader = ({ status = '', openCreateOVerlay }) => {

  const dropdownOptions = [
    {
      label: 'Campaign',
      onClick: () => openCreateOVerlay('campaign'),
      icon: GeneralImg.logo
    },
    {
      label: 'Project',
      onClick: () => openCreateOVerlay('project'),
      icon: GeneralImg.logo
    },
    {
      label: 'Task',
      onClick: () => openCreateOVerlay('task'),
      icon: GeneralImg.logo
    }
  ]

  return (
    <SubHeader pageTitle='Dashboard'>
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
