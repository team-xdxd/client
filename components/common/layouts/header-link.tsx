import styles from './header-link.module.css'
import Link from 'next/link'
import Router from 'next/router'

const HeaderLink = ({ img, href, text, active = false }) => (
  <li className={`${styles.link} ${active && styles.active}`} onClick={() => Router.replace(href)}>
    <img
      className={styles.icon}
      src={img} />
    <div className={styles.text}>
      {text}
    </div>
  </li>
)

export default HeaderLink
