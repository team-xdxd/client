import styles from './invoice-item.module.css'
import { format } from 'date-fns'
import { formatCurrency } from '../../../../utils/numbers'
import downloadUtils from '../../../../utils/download'

// Components
import Tag from '../../../common/misc/tag'
import Button from '../../../common/buttons/button'

const InvoiceItem = ({ invoice, type = 'invoice' }) => {
  const downloadInvoice = () => {
    downloadUtils.downloadFile(invoice.invoicePdf)
  }

  return (
    <div className={styles.container}>
      <div>
        {invoice.date && format(invoice.date, 'MM/dd/yyyy')}
      </div>
      <div>
        {invoice.product}
      </div>
      {type === 'invoice' && <div><Tag tag={invoice.status} altColor={invoice.status === 'paid' && 'turquoise'} /></div>}
      <div>
        {formatCurrency(invoice.amount / 100)}
      </div>
      {type === 'invoice' &&
        <Button
          text='Download'
          type='primary'
          onClick={downloadInvoice}
        />
      }
    </div>
  )
}

export default InvoiceItem