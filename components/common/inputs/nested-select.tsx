import styles from './filters-select.module.css'
import ReactSelect, { components } from 'react-select'
import { Utilities } from '../../../assets'

// Components
import FiltersSelect from './filters-select'

const NestedSelect = ({ options, placeholder, value = null, onChange = (selected) => { }, styleType = '', isClearable = false }) => {

  const Option = props => (
    <components.Option {...props} >
      <div className={styles.option}>
        <span>{props.label}</span>
        <img src={props.isSelected ? Utilities.radioButtonEnabled : Utilities.radioButtonNormal} />
      </div>
    </components.Option>
  )

  return (
    <div>

    </div>
  )
}

export default NestedSelect


