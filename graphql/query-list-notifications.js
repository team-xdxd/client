import { gql  } from '@apollo/client'

export default gql`
query {
  listNotifications {
    items {
      id
      userId
      teamId
      type
      status
      message
      item
      timestamp
    }
  }
}`