import styles from './header-link.module.css'
import Link from 'next/link'
import Router from 'next/router'

const HeaderLink = ({ img, href, text }) => (
  <li className={styles.link} onClick={() => Router.replace(href)}>
    <img
      className={styles.icon}
      src={img} />
    <div className={styles.text}>
      {text}
    </div>
  </li>
)

export default HeaderLink
