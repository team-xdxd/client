import styles from './index.module.css'
import { useState, useEffect, useContext } from 'react'
import { capitalCase } from 'change-case'
import planApi from '../../../../server-api/plan'
import constants from './constants'
import toastUtils from '../../../../utils/toast'
import { TeamContext } from '../../../../context'

// Components
import SectionButton from '../../../common/buttons/section-button'
import PlanCard from './plan-card'
import Usage from './usage'
import PlanChangeModal from './plan-change-modal'

const Plans = () => {
  const [activeCycle, setActiveCycle] = useState('annual')
  const [productData, setProductData] = useState(undefined)

  const [selectedPlan, setSelectedPlan] = useState(undefined)
  const [paymentMethod, setPaymentMethod] = useState(undefined)

  const { getPlan, plan } = useContext(TeamContext)

  useEffect(() => {
    getPlan()
    getBillingInfo()
    getPaymentMethod()
  }, [])

  const getBillingInfo = async () => {
    try {
      const { data } = await planApi.getAvailableProducts()
      setProductData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPaymentMethod = async () => {
    try {
      const { data } = await planApi.getPaymentMethod()
      setPaymentMethod(data)
    } catch (err) {
      console.log(err)
    }
  }

  const openChangeModal = (price) => {
    setSelectedPlan(price)
  }

  const redirectToContact = () => {

  }

  const confirmPlanChange = async () => {
    try {
      await planApi.changePlan({ priceId: selectedPlan.id, subProrationDate: selectedPlan.invoicePreview.prorationDate })
      setSelectedPlan(null)
      await getPlan()
      toastUtils.success('Plan changed succesfully')
    } catch (err) {
      console.log(err)
    }
  }

  const SectionButtonOption = ({ section }) => (
    <SectionButton
      text={capitalCase(section)}
      active={activeCycle === section}
      onClick={() => setActiveCycle(section)}
    />
  )

  return (
    <div className={styles.container}>
      {plan &&
        <>
          <Usage />
          <div className={styles['section-buttons']}>
            <SectionButtonOption section='annual' />
            <SectionButtonOption section='monthly' />
          </div>
          <ul className={styles.products}>
            {productData && [...productData[activeCycle], constants.ENTERPRISE_PLAN].map(price => {
              let buttonText = 'Upgrade'
              if (price.id === plan.stripePriceId) {
                buttonText = 'Current Plan'
              }
              else if (price.amount < plan.stripePrice.amount) {
                buttonText = 'Downgrade'
              }
              return (
                <li key={price.id}>
                  <PlanCard {...price}
                    onChange={price.type !== 'enterprise' ? () => openChangeModal(price) : redirectToContact}
                    buttonDisabled={price.id === plan.stripePriceId}
                    buttonText={buttonText}
                    paymentMethodExists={paymentMethod} />
                </li>
              )
            })}
          </ul>
        </>
      }
      <PlanChangeModal
        selectedPlan={selectedPlan}
        confirmPlanChange={confirmPlanChange}
        setSelectedPlan={setSelectedPlan}
      />
    </div>
  )
}

export default Plans