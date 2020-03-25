import { Controller } from 'react-hook-form'

import styles from './form-input.module.css'

const FormInput = ({ label = '', labId = '', name, control, rules, InputComponent, error = '' }) => (
  <>
    {label &&
      <label htmlFor={labId}>{label}</label>
    }
    <Controller as={InputComponent}
      name={name}
      control={control}
      rules={rules}
    />
    {error &&
      <p className={styles.error}>{error}</p>
    }
  </>
)

export default FormInput
