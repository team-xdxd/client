import styles from './select.module.css'
import ReactSelect from 'react-select'

const Select = ({ options, placeholder }) => (
  <ReactSelect
    placeholder={placeholder}
    options={options}
    className={styles.container}
    classNamePrefix='select-prefix'
  />
)

export default Select


