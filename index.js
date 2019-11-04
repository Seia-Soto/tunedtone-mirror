const WebSocket = require('ws')

const handlers = require('./handlers')

const config = require('./config')

const ws = new WebSocket(config.gateway.url, config.socket.option)

ws.once('open', () => {
  ws._key = config.app.statics.key

  ws.on('message', handlers.message.bind(null, ws))
})
