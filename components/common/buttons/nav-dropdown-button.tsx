import styles from './nav-dropdown-button.module.css'
import { Utilities } from '../../../assets'

// Components
import Dropdown from '../inputs/dropdown'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'

const NavDropdownButton = ({ text, disabled = false, options = [] }) => {

  const ButtonWrapper = ({ children }) => (
    <button
      className={styles.container}
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
      {children}
    </button>
  )

  const Content = () => (
    <Dropdown
      additionalClass={styles.menu}
      options={options}
    />
  )

  return (
    <ToggleableAbsoluteWrapper
      Wrapper={ButtonWrapper}
      Content={Content}
    />
  )
}

export default NavDropdownButton
