import { useState } from 'react'
import styles from './header-link.module.css'
import Link from 'next/link'
import Router from 'next/router'

const HeaderLink = ({ img, imgHover, href, text, active = false }) => {

  const [srcimg, setSrcimg] = useState(img)

  return (
    <Link href={href}>
      <li className={`${styles.link} ${active && styles.active}`}
        // onClick={() => Router.replace(href)}
        onMouseOver={() => setSrcimg(imgHover)}
        onMouseOut={() => setSrcimg(img)}>
        <img
          className={styles.icon}
          src={srcimg}
        />
        <div className={styles.text}>
          {text}
        </div>
      </li>
    </Link>
  )
}

export default HeaderLink
