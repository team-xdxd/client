import styles from './header-link.module.css'
import Link from 'next/link'

const HeaderLink = ({ img, href, text }) => (
  <li className={styles.link}>
    <Link href={href}>
      <>
        <img
          className={styles.icon}
          src={img} />
        <div className={styles.text}>
          {text}
        </div>
      </>
    </Link>
  </li>
)

export default HeaderLink
