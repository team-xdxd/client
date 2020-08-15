import styles from './dropdown.module.css'

const Dropdown = ({ options = [], additionalClass = '' }) => {
  console.log(options)
  return (
    <ul className={`${styles.menu} ${additionalClass}`} >
      {options.map((option, index) => (
        <div key={option.id || index}>
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
      ))}
    </ul>
  )
}

export default Dropdown
