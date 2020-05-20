import styles from './sub-header.module.css'
import { useRef, useEffect, useState } from 'react'
import { Utilities } from '../../../assets'

const SubHeader = ({ pageTitle, resetPageTittle = () => { }, titleOnchange = (e) => { }, children, editable = false }) => {
  const inputRef = useRef()
  const resizeFn = () => { inputRef.current.style.width = ((pageTitle.length + 1) * 24) + 'px'; }

  useEffect(() => {
    if (pageTitle)
      resizeFn()
  }, [pageTitle]);

  const [enabled, setEnabled] = useState(false)

  const enableNameEdition = () => {
    inputRef?.current?.focus()
    setEnabled(true)
  }

  const cancelNameEdition = () => {
    resetPageTittle()
    setEnabled(false)
  }

  return (
    <section className={styles.container}>
      <h1>
        <input
          ref={inputRef}
          value={pageTitle}
          minLength={1}
          maxLength={30}
          disabled={!enabled}
          onChange={titleOnchange} />
      </h1>
      {editable &&
        <>
          {!enabled ?
            <img onClick={enableNameEdition} className={styles.edit} src={Utilities.editWhite} />
            :
            <div onClick={cancelNameEdition} className={styles.x}>x</div>
          }
        </>

      }
      {children}
    </section>
  )
}

export default SubHeader
