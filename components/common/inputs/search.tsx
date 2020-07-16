import styles from './search.module.css'
import { Utilities } from '../../../assets'
import { useState } from 'react'

// Components
import Button from '../buttons/button'

const Search = (props) => {

  const [term, setTerm] = useState('')

  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault()
      props.onSubmit(term)
    }}>
      <div className={styles['input-container']}>
        <img src={Utilities.search} />
        <input
          {...props}
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder={props.placeholder || 'Search'}
          className={`${styles.container} ${props.styleType && styles[props.styleType]}`}
        />
      </div>
      <Button
        type={'submit'}
        text='Search'
        styleType='primary'
      />
    </form>
  )
}

export default Search
