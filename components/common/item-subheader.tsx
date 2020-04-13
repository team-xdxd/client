import styles from './item-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

// Components
import SubHeader from './sub-header'
import NavButton from './nav-button'
import StatusBadge from './status-badge'

const ItemSubHeader = ({ title, status = 'draft', saveDraft = () => { } }) => {
  return (
    <SubHeader pageTitle={title}>
      <div className={styles['header-additional']}>
        {status &&
          <StatusBadge status={status} />
        }
      </div>
      {status === 'draft' &&
        <>
          <button className={styles['draft-action']} onClick={() => Router.replace('/main/overview')}>
            Cancel
      </button>
          <button className={styles['draft-action']} onClick={saveDraft}>
            Save Draft
      </button>
        </>
      }
      <NavButton
        text='Schedule'
        onClick={() => { }}
        type='button'
      />
    </SubHeader>
  )
}

export default ItemSubHeader
