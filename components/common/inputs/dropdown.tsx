import styles from './dropdown.module.css'
import { UserContext } from '../../../context'
import { useContext } from 'react'

const Dropdown = ({ options = [], additionalClass = '' }) => {
  const { hasPermission } = useContext(UserContext)

  return (
    <ul className={`${styles.menu} ${additionalClass}`} >
      {options.map((option, index) => (
        <div key={option.id || index}>
          {(!option.permissions || hasPermission(option.permissions)) &&
            <div>
              {option.OverrideComp ?
                <option.OverrideComp />
                :
                <li onClick={() => {
                  option.onClick()
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
              }
            </div>
          }
        </div>
      ))}
    </ul>
  )
}

export default Dropdown
