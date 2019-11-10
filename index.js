const restify = require('restify')

const functions = require('./functions')
const middlewares = require('./middlewares')
const config = require('./config')

const server = restify.createServer({
  name: 'Tunedtone/mirror',
  dtrace: false
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.dateParser(59))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.jsonp())
server.use(restify.plugins.gzipResponse())

server.get('/youtube/searchVideos', functions.youtube.searchVideos)

server.listen(config.app.host.port)
