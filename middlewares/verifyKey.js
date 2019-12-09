const config = require('../config')

module.exports = (req, res, next) => {
  if (config.app.statics.key !== req.params.key) {
    res.send({
      error: 403,
      message: 'Invalid or missing the verification key.'
    })

    return
  }

  next()
}
