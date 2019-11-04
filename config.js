module.exports = {
  gateway: {
    url: 'http://localhost'
  },
  socket: {
    option: {
      // perMessageDeflate: false
    }
  },
  app: {
    statics: {
      key: 'tunedtone'
    },
    functions: {
      youtube: {
        searchVideos: {
          resultLimit: 5,
          maxDepth: 5
        }
      }
    }
  }
}
