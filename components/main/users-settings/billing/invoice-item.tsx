import styles from './invoice-item.module.css'
import { format } from 'date-fns'

// Components
import Tag from '../../../common/misc/tag'
import Button from '../../../common/buttons/button'

const InvoiceItem = ({ invoice, type = 'invoice' }) => {
  return (
    <div className={styles.container}>
      <div>
        {format(invoice.date, 'MM/dd/YYYY')}
      </div>
      <div>
        {invoice.product}
      </div>
      {type === 'invoice' && <Tag tag={invoice.status} />}
      <div>
        {invoice.amount}
      </div>
      {type === 'invoice' &&
        <Button
          text='Download'
          type='primary'
          onClick={() => { }}
        />
      }
    </div>
  )
}

export default InvoiceItem