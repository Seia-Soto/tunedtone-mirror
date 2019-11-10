const ytdl = require('ytdl-core')
const ytsr = require('ytsr')

const config = require('../../config')

const searchVideos = async (keyword, limit, depth) => {
  try {
    keyword = keyword || ''
    limit = limit || config.app.functions.youtube.searchVideos.resultLimit || 5
    depth = depth || config.app.functions.youtube.searchVideos.maxDepth || 5

    if (limit > depth * (config.app.functions.youtube.searchVideos.resultLimit || 5)) {
      return []
    }

    const results = await ytsr(keyword, { limit: limit * depth })

    const items = []

    for (let i = 0; i < results.items.length; i++) {
      const item = await results.items[i]

      if (item.type === 'video') {
        const videoInfo = await ytdl.getInfo(item.link)

        items.push(videoInfo)
      }
    }

    if (!items.length) {
      const extended = await searchVideos(keyword, limit, ++depth)

      return extended
    }

    return items
  } catch (error) {
    console.error(error)

    return []
  }
}

module.exports = async (req, res, next) => {
  const keyword = await req.params.keyword || ''

  if (!keyword) {
    res.send({
      error: 1011,
      message: 'There is no keyword to search.'
    })

    return
  }

  const results = await searchVideos(keyword)

  res.send(results)
}
