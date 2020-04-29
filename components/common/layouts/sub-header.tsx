import styles from './sub-header.module.css'
import { useRef, useEffect } from 'react'

const SubHeader = ({ pageTitle, titleOnchange = (e) => { }, children, inputDisabled = false }) => {
  const inputRef = useRef()
  const resizeFn = () => { inputRef.current.style.width = ((pageTitle.length + 1) * 24) + 'px'; }

  useEffect(() => {
    if (pageTitle)
      resizeFn()
  }, [pageTitle]);



  return (
    <section className={styles.container}>
      <h1>
        <input
          ref={inputRef}
          value={pageTitle}
          minLength={1}
          maxLength={30}
          disabled={inputDisabled}
          onChange={titleOnchange} />
      </h1>
      {children}
    </section>
  )
}

export default SubHeader
