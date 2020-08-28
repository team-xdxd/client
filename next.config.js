const withImages = require('next-images')
module.exports = withImages({
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:8080',
    DROPBOX_API_KEY: process.env.DROPBOX_API_KEY || 'gtwo80vc34l8vjd',
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL || 'https://it7l2l7v25dvhhet4izohabywu.appsync-api.us-east-1.amazonaws.com/graphql',
  },
})