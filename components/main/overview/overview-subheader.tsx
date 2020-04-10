import styles from './overview-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

import { GeneralImg } from '../../../assets'

// Components
import SubHeader from '../../common/sub-header'
import NavDropdownButton from '../../common/nav-dropdown-button'
import StatusBadge from '../../common/status-badge'

const dropdownOptions = [
  {
    label: 'Campaign',
    onClick: () => Router.replace('/main/create?type=campaign'),
    icon: GeneralImg.logo
  },
  {
    label: 'Project',
    onClick: () => Router.replace('/main/create?type=project'),
    icon: GeneralImg.logo
  },
  {
    label: 'Task',
    onClick: () => Router.replace('/main/create?type=task'),
    icon: GeneralImg.logo
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
