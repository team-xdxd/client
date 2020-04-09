import styles from './sub-header.module.css'

const SubHeader = ({ pageTitle, children }) => (
  <section className={styles.container}>
    <div>
      <h1>{pageTitle}</h1>
      {children}
    </div>
  </section>
)

export default SubHeader
