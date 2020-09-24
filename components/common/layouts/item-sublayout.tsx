import styles from './item-sublayout.module.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { Utilities } from '../../../assets'
import { TeamContext } from '../../../context'

// Components
import SectionButton from '../buttons/section-button'
import ConfirmModal from '../modals/confirm-modal'
import Dropdown from '../inputs/dropdown'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import ItemAssets from '../asset/item-assets'
import IconClickable from '../buttons/icon-clickable'

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

  const sideRef = useRef(null)

  const { getTeamMembers } = useContext(TeamContext)

  useEffect(() => {
    getTeamMembers()
  }, [])

  const toggleSideMenu = () => {
    const classType = `visible-none`
    const { current } = sideRef
    if (current?.classList.contains(classType)) current.classList.remove(classType)
    else current.classList.add(classType)
  }

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
        <div ref={sideRef} className={styles['side-component']}>
          {SideComponent}
        </div>
      }

      <div className={styles['side-bar']}>
        <div onClick={toggleSideMenu}>
          <IconClickable src={Utilities.closePanelLight} onClick={toggleSideMenu}
            additionalClass={sideRef.current?.classList.contains('visible-none') ? '' : ''} />
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
