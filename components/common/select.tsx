import styles from './select.module.css'

const Select = ({ options, placeholder }) => (
  <select
    className={styles.container}
  >
    <option value='' disabled selected>{placeholder}</option>
    {options.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </select>
)

export default Select


