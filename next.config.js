const withImages = require('next-images')
module.exports = withImages({
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:8080',
    DROPBOX_API_KEY: process.env.DROPBOX_API_KEY || 'gtwo80vc34l8vjd'
  },
})