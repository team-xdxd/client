import styles from './sub-header.module.css'
import { useRef, useEffect } from 'react'

const SubHeader = ({ pageTitle, titleOnchange = (e) => { }, children }) => {
  const inputRef = useRef()
  const resizeFn = () => { inputRef.current.style.width = ((pageTitle.length + 1) * 24) + 'px'; }

  useEffect(() => {
    resizeFn()
  }, [pageTitle]);

  

  return (
    <section className={styles.container}>
      <h1>
        <input
          ref={inputRef}
          value={pageTitle}
          maxLength={30}
          onChange={titleOnchange} />
      </h1>
      {children}
    </section>
  )
}

export default SubHeader
