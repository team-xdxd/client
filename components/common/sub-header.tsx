import styles from './sub-header.module.css'

const SubHeader = ({ pageTitle, children }) => (
  <section className={styles.container}>
    <h1>{pageTitle}</h1>
    {children}
  </section>
)

export default SubHeader
