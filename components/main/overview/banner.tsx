import styles from './banner.module.css'
const defaultBanner = require('../../../assets/images/banner-default-scaled.jpg')

const Banner = ({ userName = 'Spencer Moss' }) => (
  <div className={`${styles.container}`}>
    <img src={defaultBanner} />
    <h1>
      Welcome,
      <span>{userName}</span>
    </h1>
  </div>
)

export default Banner
