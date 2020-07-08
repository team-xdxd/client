import styles from './dropdown.module.css'

const Dropdown = ({ options = [], additionalClass = '' }) => {

  return (
    <ul className={`${styles.menu} ${additionalClass}`} >
      {options.map((option, index) => (
        <>
          {option.OverrideComp ?
            <option.OverrideComp key={index} />
            :
            <li key={index} onClick={() => {
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
        </>
      ))}
    </ul>
  )
}

export default Dropdown
