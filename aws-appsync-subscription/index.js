// REFERENCE: https://docs.aws.amazon.com/appsync/latest/devguide/real-time-websocket-client.html
import querystring from 'querystring'

const CONNECTION_ACK = 'connection_ack'
const KA = 'ka'
const DATA = 'data'

let socket

const initConnection = ({ uri, queryParams, subHeaders, subData }, attemps = 0, callback) => {
  if (socket && socket.readyState !== socket.CLOSED) return
  socket = new WebSocket(`${uri}?header=${queryParams.header}&payload=${queryParams.payload}`, ['graphql-ws'])

  socket.onopen = () => {
    callback()
    // sendInitMessages({ subHeaders, subData })
  }
  socket.onclose = async () => {
    // Attempt reconnect after 1 sec
    await new Promise((resolve) => setTimeout(() => resolve(), 1000))
    if (attemps < 10)
      initConnection({ uri, queryParams, subHeaders, subData }, attemps + 1, callback)
    else
      console.log('Ran out of attempts')
  }
}

const getSocket = () => socket

const sendInitMessages = ({ subHeaders, subData }) => {
  // Connection opened
  sendData({
    type: 'connection_init'
  })

  const firstMessageHandler = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData)
    if (data.type === CONNECTION_ACK) {
      sendData({
        id: "1",
        payload: {
          data: JSON.stringify(subData),
          extensions: {
            authorization: subHeaders
          }
        },
        type: 'start'
      })
      // socket.removeEventListener('message', firstMessageHandler)
    }

  }

  socket.onmessage = firstMessageHandler
}

const sendData = (data) => {
  if (!socket) return
  socket.send(JSON.stringify(data))
}

export default {
  initConnection,
  getSocket
}