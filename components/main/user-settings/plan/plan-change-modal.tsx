import styles from './plan-change-modal.module.css'
import { formatCurrency } from '../../../../utils/numbers'

// Components
import BaseModal from '../../../common/modals/base'

const PlanChangeModal = ({ selectedPlan, setSelectedPlan, confirmPlanChange }) => {

  const getAmount = (amount) => {
    if (amount < 0) {
      return `-${formatCurrency(amount * (-1) / 100)}`
    } else {
      return `${formatCurrency(amount / 100)}`
    }
  }

  return (
    <BaseModal
      closeModal={() => setSelectedPlan(null)}
      modalIsOpen={selectedPlan}
      confirmAction={confirmPlanChange}
      confirmText={`Update to ${selectedPlan?.name}`}
      headText={'Confirm Plan Change'}
    >
      <div className={styles.container}>
        <h3>Plan Pricing Details:</h3>
        {selectedPlan &&
          <>
            {selectedPlan.invoicePreview.items.map(item => (
              <div className={styles.item}>
                <div className={styles['item-description']}>
                  {`${item.description}:`}
                </div>
                <div className={styles['item-amount']}>
                  {getAmount(item.amount)}
                </div>
              </div>
            ))}
            {selectedPlan.invoicePreview.startingBalance !== 0 &&
              <div className={styles.item}>
                <div className='pricing-detail-description'>
                  Stored Balance:
              </div>
                <div className='pricing-detail-value'>
                  {getAmount(selectedPlan.invoicePreview.startingBalance)}
                </div>
              </div>
            }
            <div className={styles.item}>
              <h3 className={styles['item-description']}>Total</h3>
              <div className={styles.total}>{formatCurrency(selectedPlan.invoicePreview.amount / 100)}</div>
            </div>
          </>
        }
      </div>
    </BaseModal>
  )
}

export default PlanChangeModal