import styles from './item-sublayout.module.css'
import { useState, useRef } from 'react'
import { Utilities } from '../../../assets'

// Components
import SectionButton from '../buttons/section-button'
import ConfirmModal from '../modals/confirm-modal'
import Dropdown from '../inputs/dropdown'

const ItemSublayout = ({
  SideComponent = null,
  sideActive = true,
  navElements = [],
  children,
  layout = 'double',
  type = 'item',
  deleteItem = () => { }
}) => {

  const buttonRef = useRef(null)
  const wrapperRef = useRef(null)

  const [moreVisible, setMoreVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
      setMoreVisible(false)
    }
  }

  const setDropdownOpen = (e, visible) => {
    if (e) {
      e.stopPropagation()
    }
    setMoreVisible(visible)
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles['main-component']}>
        <div className={styles.heading}>
          <div className={styles[layout]}>
            <SectionButton
              text='Details'
              active={true}
            />
          </div>
        </div>
        <div className={styles.children}>
          {children}
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
        <div className={styles.more}
          ref={buttonRef}
          onClick={(e) => setDropdownOpen(e, !moreVisible)}
        >
          <img src={Utilities.moreLight} />
          {moreVisible &&
            <div className={styles['more-drop']} ref={wrapperRef}>
              <Dropdown
                options={[{ label: 'Delete' }]}
                onClick={() => {
                  setDropdownOpen(null, false)
                  setModalOpen(true)
                }}
              />
            </div>
          }
        </div>
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
