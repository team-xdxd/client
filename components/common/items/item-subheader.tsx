import styles from './item-subheader.module.css'
import { useContext, useState } from 'react'
import Router from 'next/router'
import { AssetContext, UserContext } from '../../../context'
import { ASSET_ACCESS } from '../../../constants/permissions'

// Components
import SubHeader from '../layouts/sub-header'
import NavButton from '../buttons/nav-button'
import StatusBadge from '../misc/status-badge'
import AssetHeaderOps from '../asset/asset-header-ops'
import AssetAddition from '../asset/asset-addition'
import RenameModal from '../modals/rename-modal'

const ItemSubHeader = ({
  title,
  status = 'draft',
  saveDraft = () => { },
  changeName,
  changeStatus,
  hasAssets = false,
  type = '',
  itemId = ''
}) => {
  const { assets } = useContext(AssetContext)
  const { hasPermission } = useContext(UserContext)
  const [activeSearchOverlay, setActiveSearchOverlay] = useState(false)
  const selectedAssets = assets.filter(asset => asset.isSelected)
  const [renameModalOpen, setRenameModalOpen] = useState(false)

  return (
    <SubHeader
      editable={true}
      pageTitle={title}
      onAltEditionClick={() => setRenameModalOpen(true)}
    >
      <div className={styles['header-additional-wrapper']}>
        <div className={styles['header-additional']}>
          {status &&
            <StatusBadge status={status} />
          }
          {type === 'task' && status !== 'completed' &&
            <button className={styles['draft-action']} onClick={() => changeStatus('completed')}>
              Mark as Complete
            </button>
          }
        </div>


        {!activeSearchOverlay && selectedAssets.length > 0 ?
          <>
            <div className={styles.break}></div>
            <AssetHeaderOps itemType={type} />
          </>
          :
          <>
            {hasAssets && hasPermission([ASSET_ACCESS]) &&
              <AssetAddition
                folderAdd={false}
                type={type}
                itemId={itemId}
                activeSearchOverlay={activeSearchOverlay}
                setActiveSearchOverlay={setActiveSearchOverlay} />
            }
            <div className={styles.break}></div>
            <button className={styles['draft-action']} onClick={() => Router.replace('/main/overview')}>
              Cancel
            </button>
            {status === 'draft' &&
              <button className={styles['draft-action']} onClick={saveDraft}>
                Save Draft
            </button>
            }
            {(status !== 'draft') &&
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
            {status !== 'draft' &&
              <NavButton
                text='Save'
                onClick={saveDraft}
                type='button'
              />
            }
          </>
        }
      </div>
      <RenameModal
        closeModal={() => setRenameModalOpen(false)}
        modalIsOpen={renameModalOpen}
        renameConfirm={changeName}
        type={type}
        initialValue={title}
      />
    </SubHeader>
  )
}

export default ItemSubHeader
