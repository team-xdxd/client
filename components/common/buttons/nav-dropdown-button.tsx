import { useState } from 'react'
import styles from './nav-dropdown-button.module.css'
import { Utilities } from '../../../assets'

const NavDropdownButton = ({ text, onClick = () => { }, disabled = false, options = [] }) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className={styles.container}
        onClick={onClick}
        disabled={disabled}
      >
        <span className={styles.icon}>
          <img src={Utilities.edit} />
        </span>
        <span className={styles.text}>
          {text}
        </span>
        <span className={styles.dropdown} onClick={(e) => {
          e.stopPropagation()
          toggleIsOpen()
        }}>
          <img src={Utilities.arrow} />
        </span>
        {isOpen &&
          <ul className={styles.menu}>
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
