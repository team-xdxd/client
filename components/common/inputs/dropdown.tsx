import { useState } from 'react'
import styles from './dropdown.module.css'
import { GeneralImg, Utilities } from '../../../assets'

const Dropdown = ({ onClick = (option, index) => { }, options = [] }) => {

  return (
    <ul className={styles.menu}>
      {options.map((option, index) => (
        <li key={index} onClick={(e) => {
          e.stopPropagation()
          onClick(option, index)
        }}>
          <span>
            {option.icon &&
              <img src={option.icon} />
            }
          </span>
          <span>
            {option.label}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
