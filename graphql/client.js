import { ApolloClient, InMemoryCache, createHttpLink, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

// Instantiate required constructor fields
const cache = new InMemoryCache();

const link = new HttpLink({
  uri: process.env.GRAPHQL_BASE_URL, fetch, headers: {
    'x-api-key': 'da2-wbkvph4mvbe5bmtzuamrfwt2vi'
  }
})

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client
