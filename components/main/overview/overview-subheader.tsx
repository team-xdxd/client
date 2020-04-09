import styles from './overview-subheader.module.css'
import Link from 'next/link'

// Components
import SubHeader from '../../common/sub-header'

const OverviewSubHeader = ({ isDraft = false }) => (
  <SubHeader pageTitle='Dashboard'>
    {isDraft &&
      <span>Draft</span>
    }
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
  </SubHeader>
)

export default OverviewSubHeader
