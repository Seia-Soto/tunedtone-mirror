# Tunedtone/mirror

The mirror server to provide YouTube videos.

## Table of Contents

- [Concept](#Concept)
- [Docs](#Docs)
- [License](#License)

----

# Concept

To download a YouTube video safely, we need to anonymous ourselves because if we don't anonymous ourselves, we'll rate-limited and prevented from YouTube internal system. To avoid these issues, people used proxies and mirror servers. This is one alternative to download videos safely. ~~This mirror server is configured with WebSocket to prevent tracking from outside of the system and to provide service even on the host which can't get a request from outside.~~

# Docs

## Requirements

- Permissions to access directory `/bin`. (If not may cause error)
- Node.JS and Yarn to install dependencies and to run this app.

## Config

- Refers `{REPO_ROOT}/config.example.js`

Edit the example config and copy it into `{REPO_ROOT}/config.js`.

```js
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
```

## Routes

| Type | Route | Response type |
| :------------- | :------------- | :------------- |
| Function | /youtube/searchVideos | JSON |
| Function | /youtube/downloadVideo | Binary/RAW (Audio) |

### youtube/searchVideos

- Request as GET/POST
- Params
  - key (string)
  - keyword (string)

Performs a search from YouTube to find video and returns video only (not movies and playlists).

```
curl localhost:3597/youtube/searchVideos?key={authKey}&keyword={keyword}
```

### youtube/downloadVideo

- Request as GET/POST
- Params
  - key (string)
  - keyword (string)

Returns a raw **audio** binary data of the video requested.

```
curl localhost:3597/youtube/downloadVideo?key={authKey}&id={videoID}
```

## Response

### Error

However, if there were an error during calling the function, you'll get the error code from the response. See the example response below.

```JSON
{
  "error": {
    "code": 0,
    "message": null
  }
}
```

The general error code from the function call is figured with 4 digits. The first digit of the error code expresses where the error came(application internal error or function call) from and the second one expresses the subject of function. Third and fourth digits are expressing error from inside of a function. So, you can resolve the error code `1001` just like below.

- 1 (Application or function call)
  - 0: Application internal error*
  - 1: Error from function call
- 0 (Subject, first value is `0`, The position of the function aligned by the date added)
  - 0: youtube
- 1 (The position of the function from alphabetically aligned by the date added)
  - 1: searchVideos
  - 2: downloadVideo
- 1 (Condition)
  - 1: noKeyword (First condition of the function)

| Type | Name | Code | Message |
| :------------- | :------------- | :------------- | :------------- |
| Function | youtube/searchVideos | 1011 | There is no keyword to search. |
| Function | youtube/downloadVideo | 1021 | There is no ID of video to download. |
| Function | youtube/downloadVideo | 1022 | Failed to download video. |

# License

Tunedtone repositories are accepting MIT license.

```text
MIT License

Copyright 2019 Seia-Soto and Tunedtone contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
