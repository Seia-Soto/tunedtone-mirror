module.exports = {
  app: {
    host: {
      port: 3597
    },
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
