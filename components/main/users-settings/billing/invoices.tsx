import styles from './invoices.module.css'
import { useState, useEffect } from 'react'

// Components
import InvoiceItem from './invoice-item'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [upcoming, setUpcoming] = useState([])

  useEffect(() => {
    getInvoices()
  }, [])

  const getInvoices = async () => {
    try {

    } catch (err) {

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

  return (
    <div>
      <h3>Invoices</h3>
      <ul>
        <Headers />
        {invoices.map((invoice, index) => (
          <li key={index}>
            <InvoiceItem invoice={invoice} />
          </li>
        ))}
      </ul>

      <h3>Upcoming Charges</h3>
      <ul>
        <Headers type='upcoming' />
        {upcoming.map((invoice, index) => (
          <li key={index}>
            <InvoiceItem invoice={invoice} type='upcoming' />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Invoices