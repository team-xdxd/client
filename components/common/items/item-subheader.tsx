import styles from './item-subheader.module.css'
import { useContext } from 'react'
import Router from 'next/router'
import { AssetContext } from '../../../context'
import Link from 'next/link'

// Components
import SubHeader from '../layouts/sub-header'
import NavButton from '../buttons/nav-button'
import StatusBadge from '../misc/status-badge'
import AssetHeaderOps from '../../common/asset/asset-header-ops'

const ItemSubHeader = ({ title, status = 'draft', saveDraft = () => { }, changeName, changeStatus, resetPageTittle, hasAssets = false }) => {
  const { assets } = useContext(AssetContext)
  const selectedAssets = assets.filter(asset => asset.isSelected)
  return (
    <SubHeader
      editable={true}
      pageTitle={title}
      titleOnchange={(e) => changeName(e.target.value)}
      resetPageTittle={resetPageTittle}
    >
      <div className={styles['header-additional']}>
        {status &&
          <StatusBadge status={status} />
        }
      </div>

      {(hasAssets && selectedAssets.length > 0) ?
        <AssetHeaderOps />
        :
        <>
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
        </>
      }
    </SubHeader>
  )
}

export default ItemSubHeader
