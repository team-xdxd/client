import { gql  } from '@apollo/client'

export default gql`
subscription($notification: CreateNotificationInput!) {
  onCreateNotification(input: $notification) {
    id
    userId
    teamId
    type
    status
    message
    item
    timestamp
  }
}`