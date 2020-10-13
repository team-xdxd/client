import styles from './subscription-checkout.module.css'
import { useEffect, useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import planApi from '../../../../server-api/plan'
import { TeamContext } from '../../../../context'
import toastUtils from '../../../../utils/toast'

// Components
import SubscriptionSummary from '../../../common/payment/subscription-summary'
import CreditCardForm from '../../../common/payment/credit-card-form'

const stripePromise = loadStripe('pk_test_bK1C20PBomU24spmlMeg4AXp')

const SubscriptionCheckout = ({ goBack, checkoutProduct }) => {

  const [productData, setProductData] = useState(undefined)
  const [selectedPrice, setSelectedPrice] = useState(null)

  const { getPlan } = useContext(TeamContext)

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    try {
      const { data } = await planApi.getAvailableProducts()
      setProductData(data)      
    } catch (err) {
      // TODO: Handle error
      console.log(err)
    }
  }

  const subscribe = async (paymentMethodId) => {
    try {
      await planApi.changePlan({ priceId: selectedPrice.id, paymentMethodId })
      await getPlan()
      goBack()
      toastUtils.success('Plan changed succesfully')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className={`${styles.container} container-centered`}>
      {productData &&
        <div>
          <SubscriptionSummary
            productData={productData}
            setSelectedPrice={setSelectedPrice}
            selectedPrice={selectedPrice}
            checkoutProduct={checkoutProduct}
          />
          <Elements stripe={stripePromise}>
            <CreditCardForm
              onConfirm={subscribe}
              buttonDisabled={!selectedPrice}
            />
          </Elements>
        </div>
      }
    </main>
  )
}

export default SubscriptionCheckout
