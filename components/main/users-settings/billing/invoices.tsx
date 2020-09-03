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
    <li>
      <div>Date</div>
      <div>Plan</div>
      {type === 'invoice' && <div>Status</div>}
      <div>Amount</div>
    </li>
  )

  console.log(invoices)

  const parsedInvoices = invoices
    .map(invoice => ({
      ...invoice,
      date: (!isNaN(invoice.statusTransitions.paid_at) && new Date(invoice.statusTransitions.paid_at * 1000)) || ''
    }))
  const parsedUpcoming = upcoming.map(upcoming => ({ ...upcoming, date: new Date(upcoming.date * 1000) }))

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

      <h3>Upcoming Charges</h3>
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