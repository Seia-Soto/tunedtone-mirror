module.exports = {
  app: {
    host: {
      port: 3597 // NOTE: The port application hosted
    },
    statics: {
      key: 'tunedtone', // NOTE: The private key for verification of a gateway
      files: {
        savedVideos: 'bin/' // NOTE: The directory where the files are saved
      }
    },
    functions: {
      youtube: {
        searchVideos: {
          resultLimit: 2, // NOTE: The limitation of video per search
          maxDepth: 5 // NOTE: The limitation of depth of search
        }
      }
    }
  }
}
