const ytdl = require('ytdl-core')
const ytsr = require('ytsr')

const config = require('../../config')

const search = async (keyword, limit, depth) => {
  try {
    keyword = keyword || ''
    limit = limit || config.app.functions.youtube.searchVideos.resultLimit || 5
    depth = await depth || config.app.functions.youtube.searchVideos.maxDepth || 5

    if (depth >= 5) {
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
      const extended = await search(keyword, limit, ++depth)

      return extended
    }

    return items
  } catch (error) {
    return []
  }
}

module.exports = (ws, pack) => {
  const keyword = pack.opts.keyword || ''

  if (!keyword) {
    return ws.send(JSON.stringify({
      error: {
        code: 1011,
        message: 'There is no keyword to search'
      },
      key: ws._key
    }))
  }

  search(keyword)
    .then(result => {
      ws.send(JSON.stringify({
        result,
        key: ws._key
      }))
    })
}
