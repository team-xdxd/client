import styles from './item-subheader.module.css'
import Router from 'next/router'
import Link from 'next/link'

// Components
import SubHeader from '../layouts/sub-header'
import NavButton from '../buttons/nav-button'
import StatusBadge from '../misc/status-badge'

const ItemSubHeader = ({ title, status = 'draft', saveDraft = () => { }, changeName, schedule }) => {
  return (
    <SubHeader
      pageTitle={title}
      titleOnchange={(e) => changeName(e.target.value)}
    >
      <div className={styles['header-additional']}>
        {console.log(status)}
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
        onClick={() => schedule('scheduled')}
        type='button'
      />
    </SubHeader>
  )
}

export default ItemSubHeader
