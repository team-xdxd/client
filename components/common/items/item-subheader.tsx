import styles from './item-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

// Components
import SubHeader from '../layouts/sub-header'
import NavButton from '../buttons/nav-button'
import StatusBadge from '../misc/status-badge'

const ItemSubHeader = ({ title, status = 'draft', saveDraft = () => { }, changeName, changeStatus }) => {
  return (
    <SubHeader
      pageTitle={title}
      titleOnchange={(e) => changeName(e.target.value)}
    >
      <div className={styles['header-additional']}>
        {status &&
          <StatusBadge status={status} />
        }
      </div>

      <button className={styles['draft-action']} onClick={() => Router.replace('/main/overview')}>
        Cancel
      </button>
      {status === 'draft' &&
        <button className={styles['draft-action']} onClick={saveDraft}>
          Save Draft
      </button>
      }
      {status === 'scheduled' &&
        <button className={styles['draft-action']} onClick={() => changeStatus('draft')}>
          Change to Draft
      </button>
      }
      {status === 'draft' &&
        <NavButton
          text='Schedule'
          onClick={() => changeStatus('scheduled')}
          type='button'
        />
      }
      {status === 'scheduled' &&
        <NavButton
          text='Save'
          onClick={saveDraft}
          type='button'
        />
      }

    </SubHeader>
  )
}

export default ItemSubHeader
