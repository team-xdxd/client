import styles from './item-detail-add.module.css'

import { GeneralImg } from '../../assets'

const ItemFieldWrapper = ({ image, title, children }) => (
  <div>
    <img src={image} />
    <div>
      <span>
        {title}
      </span>
      <div>
        {children}
      </div>
    </div>
  </div>
)

export default ItemFieldWrapper
