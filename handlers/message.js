const functions = require('../functions')
const config = require('../config')

module.exports = (ws, data) => {
  try {
    const pack = JSON.parse(data)

    if (pack._key === config.app.statics.key) {
      functions[pack.subject][pack.call/* Name of function to execute */](ws, pack)
    }
  } catch (error) {
    console.error(error)

    ws.send(JSON.stringify({
      error: {
        code: 500,
        message: 'Unknown error from function call.' // NOTE: Need to hide the error.
      }
    }))
  } finally {
    // NOTE: Logging.
  }
}
