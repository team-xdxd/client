import styles from './overview-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

import { ProjectTypes } from '../../../assets'

// Components
import SubHeader from '../../common/sub-header'
import NavDropdownButton from '../../common/nav-dropdown-button'
import StatusBadge from '../../common/status-badge'

const dropdownOptions = [
  {
    label: 'Campaign',
    onClick: () => Router.replace('/main/create?type=campaign'),
    icon: ProjectTypes.campaign
  },
  {
    label: 'Project',
    onClick: () => Router.replace('/main/create?type=project'),
    icon: ProjectTypes.project
  },
  {
    label: 'Task',
    onClick: () => Router.replace('/main/create?type=task'),
    icon: ProjectTypes.task
  }
]

const OverviewSubHeader = ({ status = '', isDraft = false }) => (
  <SubHeader pageTitle='Dashboard'>
    <div className={styles['header-additional']}>
      {status &&
        <StatusBadge status='draft' />
      }
    </div>
    {isDraft &&
      <>
        <button className={styles['draft-action']}>
          Cancel
      </button>
        <button className={styles['draft-action']}>
          Save Draft
      </button>
      </>
    }
    <NavDropdownButton
      text='Create New'
      onClick={() => Router.replace('/main/create')}
      options={dropdownOptions}
    />
  </SubHeader>
)

export default OverviewSubHeader
