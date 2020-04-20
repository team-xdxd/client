const withImages = require('next-images')
module.exports = withImages({
  env: {
    SERVER_BASE_URL: 'http://localhost:8080',
    //SERVER_BASE_URL: 'https://sparkfive-server-tx2pavnyca-uc.a.run.app'
  },
})