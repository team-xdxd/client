import { useQuery } from '@apollo/client'
import QueryListNotifications from '../../../graphql/query-list-notifications'
import SubscriptionOnCreateNotification from '../../../graphql/subscription-on-create-notification'

const Notification = () => {
  const { loading, error, data } = useQuery(QueryListNotifications)

  console.log(data)

  return (
    <div>
     
    </div>
  )
}

export default Notification