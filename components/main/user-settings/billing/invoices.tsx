import styles from './invoices.module.css'
import { useState, useEffect } from 'react'
import planApi from '../../../../server-api/plan'

// Components
import InvoiceItem from './invoice-item'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    getInvoices()
    getUpcoming()
  }, [])

  const getInvoices = async () => {
    try {
      const { data: { hasMore, invoices } } = await planApi.getInvoices()
      setHasMore(hasMore)
      setInvoices(invoices)
    } catch (err) {
      console.log(err)
    }
  }

  const getUpcoming = async () => {
    try {
      const { data } = await planApi.getUpcomingInvoice()
      setUpcoming([data])
    } catch (err) {
      console.log(err)
    }
  }

  const Headers = ({ type = 'invoice' }) => (
    <li className={styles.headers}>
      <div>Date</div>
      <div>Plan</div>
      {type === 'invoice' && <div>Status</div>}
      <div>Amount</div>
      {type === 'invoice' && <div></div>}
    </li>
  )

  const parsedInvoices = invoices
    .filter(({ product, status, statusTransitions }) => product !== process.env.STRIPE_EXPIRE_PRODUCT_NAME && (status !== 'draft' || statusTransitions.finalized_at))
    .map(invoice => ({
      ...invoice,
      date: getInvoiceDate(invoice),
      status: getInvoiceStatus(invoice)
    }))

  const parsedUpcoming = upcoming
    .filter(({ product }) => product !== process.env.STRIPE_EXPIRE_PRODUCT_NAME)
    .map(upcoming => ({ ...upcoming, date: new Date(upcoming.date * 1000) }))

  return (
    <div>
      <h3>Invoices</h3>
      <ul>
        <Headers />
        {parsedInvoices.map((invoice, index) => (
          <li key={index}>
            <InvoiceItem invoice={invoice} />
          </li>
        ))}
      </ul>

      <h3 className={styles['upcoming-header']}>Upcoming Charges</h3>
      <ul>
        <Headers type='upcoming' />
        {parsedUpcoming.map((invoice, index) => (
          <li key={index}>
            <InvoiceItem invoice={invoice} type='upcoming' />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Invoices

const getInvoiceDate = (invoice) => {
  if (invoice.status === 'paid') {
    return (!isNaN(invoice.statusTransitions.paid_at) && new Date(invoice.statusTransitions.paid_at * 1000)) || ''
  } else {
    return new Date(invoice.statusTransitions.finalized_at * 1000)
  }
}

const getInvoiceStatus = (invoice) => {
  if (invoice.status === 'open') {
    return 'in process'
  } else return invoice.status
}