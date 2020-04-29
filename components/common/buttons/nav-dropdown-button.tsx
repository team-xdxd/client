import { useState, useRef } from 'react'
import styles from './nav-dropdown-button.module.css'
import { Utilities } from '../../../assets'

const NavDropdownButton = ({ text, onClick = () => { }, disabled = false, options = [] }) => {

  const buttonRef = useRef(null)
  const wrapperRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const setDropdownOpen = (e, visible) => {
    e.stopPropagation()
    setIsOpen(visible)
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  return (
    <>
      <button
        className={styles.container}
        ref={buttonRef}
        onClick={(e) => {
          setDropdownOpen(e, !isOpen)
        }}
        disabled={disabled}
      >
        <span className={styles.icon}>
          <img src={Utilities.editWhite} />
        </span>
        <span className={styles.text}>
          {text}
        </span>
        <span className={styles.dropdown} >
          <img src={Utilities.arrow} />
        </span>
        {isOpen &&
          <ul className={styles.menu} ref={wrapperRef}>
            {options.map((option, index) => (
              <li key={index} onClick={(e) => {
                e.stopPropagation()
                option.onClick()
                setIsOpen(false)
              }}>
                <span>
                  <img src={option.icon} />
                </span>
                <span>
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        }
      </button>
    </>
  )
}

export default NavDropdownButton
