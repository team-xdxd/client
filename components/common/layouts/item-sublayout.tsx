import styles from './item-sublayout.module.css'
import { useState, useRef } from 'react'
import { Utilities } from '../../../assets'

// Components
import SectionButton from '../buttons/section-button'
import ConfirmModal from '../modals/confirm-modal'
import Dropdown from '../inputs/dropdown'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import ItemAssets from '../asset/item-assets'

const ItemSublayout = ({
  SideComponent = null,
  sideActive = true,
  navElements = [],
  children,
  layout = 'double',
  type = 'item',
  hasAssets = false,
  itemId = '',
  deleteItem = () => { }
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeMain, setActiveMain] = useState('details')

  return (
    <div className={styles.container}>
      <div className={styles['main-component']}>
        <div className={styles.heading}>
          <div className={styles[layout]}>
            <SectionButton
              text='Details'
              active={activeMain === 'details'}
              onClick={() => setActiveMain('details')}
            />
            {hasAssets &&
              <SectionButton
                text='Assets'
                active={activeMain === 'assets'}
                onClick={() => setActiveMain('assets')}
              />
            }
          </div>
        </div>
        <div className={styles.children}>
          {activeMain === 'details' &&
            <>
              {children}
            </>
          }
          {activeMain === 'assets' &&
            <ItemAssets type={type} itemId={itemId} />
          }
        </div>
      </div>

      {SideComponent && sideActive &&
        <div className={styles['side-component']}>
          {SideComponent}
        </div>
      }

      <div className={styles['side-bar']}>
        <div>
          <img src={Utilities.closePanelLight} />
        </div>
        <div className={styles.separator}></div>
        <div className={styles.elements}>
          {navElements.map((navElement, index) => (
            <img key={index} src={navElement.icon} onClick={navElement.onClick} />
          ))}
        </div>
        <div className={styles.separator}></div>
        <ToggleableAbsoluteWrapper
          wrapperClass={styles.more}
          Wrapper={({ children }) => (
            <>
              <img src={Utilities.moreLight} />
              {children}
            </>
          )}
          contentClass={styles['more-drop']}
          Content={() => (
            <Dropdown
              options={[{ label: 'Delete', onClick: () => setModalOpen(true) }]}
            />
          )}
        />
      </div>
      {/* Delete modal */}
      <ConfirmModal
        closeModal={() => setModalOpen(false)}
        confirmAction={() => {
          deleteItem()
          setModalOpen(false)
        }}
        confirmText={'Delete'}
        message={
          <span>
            Are you sure you want to &nbsp;<strong>Delete</strong>&nbsp; this {type}?
        </span>
        }
        modalIsOpen={modalOpen}
      />
    </div>
  )
}

export default ItemSublayout
