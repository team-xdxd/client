import styles from './select.module.css'
import ReactSelect from 'react-select'

const Select = ({ options, placeholder, value = null, onChange = (selected) => { }, styleType = '' }) => (
  <ReactSelect
    placeholder={placeholder}
    options={options}
    className={`${styles.container} ${styleType}`}
    value={value}
    onChange={onChange}
    classNamePrefix='select-prefix'
  />
)

export default Select


