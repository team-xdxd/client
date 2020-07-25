import styles from './filters-select.module.css'
import ReactSelect, { components } from 'react-select'
import { Utilities } from '../../../assets'

const FiltersSelect = ({ options, placeholder, value = null, onChange = (selected) => { }, styleType = '', isClearable = false, closeMenuOnSelect = false }) => {

  const Option = props => (
    <components.Option {...props} >
      <div className={styles.option}>
        <span>{props.label}</span>
        <img src={props.isSelected ? Utilities.radioButtonEnabled : Utilities.radioButtonNormal} />
      </div>
    </components.Option>
  )

  return (
    <ReactSelect
      controlShouldRenderValue={false}
      placeholder={placeholder}
      options={options}
      closeMenuOnSelect={closeMenuOnSelect}
      components={{ Option }}
      className={`${styles.container} ${styleType} ${styles[styleType]}`}
      value={value}
      isMulti={true}
      hideSelectedOptions={false}
      onChange={onChange}
      classNamePrefix='select-prefix'
      isClearable={isClearable}
    />
  )
}

export default FiltersSelect


