const withImages = require('next-images')
module.exports = withImages({
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:8080',
    DROPBOX_API_KEY: process.env.DROPBOX_API_KEY || 'gtwo80vc34l8vjd',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || 'pk_test_bK1C20PBomU24spmlMeg4AXp',
    STRIPE_EXPIRE_PRODUCT_NAME: process.env.STRIPE_EXPIRE_PRODUCT_NAME || 'Free',
    STRIPE_DEFAULT_SIGNUP_PRICE: process.env.STRIPE_DEFAULT_SIGNUP_PRICE || 'price_1HLF2JI2e9K8b8wpF4aheZKo',
    DEFAULT_TRIAL_PRODUCT: process.env.DEFAULT_TRIAL_PRODUCT || 'prod_Hv5C1USjYMtYBp',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '1053631313639-o0m00gdem0cgd3agg6i4o0iop657llkk.apps.googleusercontent.com',
    GOOGLE_DEVELOPER_KEY: process.env.GOOGLE_DEVELOPER_KEY || 'AIzaSyAqsbbj0ufdPdUO7tQwkvU1gAPn19hTo3s',
    APPSYNC_GRAPHQL_REALTIMEURL: process.env.APPSYNC_GRAPHQL_REALTIMEURL || 'wss://it7l2l7v25dvhhet4izohabywu.appsync-realtime-api.us-east-1.amazonaws.com/graphql',
  },
})
