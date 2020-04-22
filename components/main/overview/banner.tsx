import styles from './banner.module.css'
const defaultBanner = require('../../../assets/Images/banner-default-scaled.jpg')

const Banner = ({ userName }) => (
  <div className={`${styles.container}`}>
    <img src={defaultBanner} />
    <h1>
      Welcome,
      <span>{userName.split(' ')[0]}</span>
    </h1>
  </div>
)

export default Banner
