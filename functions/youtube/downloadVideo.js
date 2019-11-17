const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')

const config = require('../../config')

const makeDirectory = location => {
  if (!fs.existsSync(location)) {
    console.log('Creating directory:', location)

    fs.mkdirSync(location)
  }
}
const downloadVideo = id => {
  const directoryLocation = path.join(__dirname, '..', '..', config.app.statics.files.savedVideos)
  const fileLocation = path.join(directoryLocation, id)

  return new Promise((resolve, reject) => {
    makeDirectory(directoryLocation)

    if (fs.existsSync(fileLocation)) {
      resolve(fileLocation)
    } else {
      ytdl(id)
        .on('error', error => {
          console.log(error)

          reject(error)
        })
        .pipe(fs.createWriteStream(fileLocation))
        .on('error', error => reject(error))
        .on('finish', () => resolve(fileLocation))
    }
  })
}

module.exports = (req, res, next) => {
  const id = req.params.id || ''

  if (!id) {
    res.send({
      error: 1021,
      message: 'There is no ID of video to download.'
    })

    return
  }

  downloadVideo(id)
    .then(file => res.sendRaw(fs.readFileSync(file)))
    .catch(error => {
      console.log(error)

      res.send({
        error: 1022,
        message: 'Failed to download video.'
      })
    })
}
