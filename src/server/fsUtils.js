const fs = require('fs')
const path = require('path')
const WordTries = require('build-word-tries')

function readAndBuildTries(filename, start=0, end=null, depth, callback) {
  fs.readFile(
    path.join(__dirname, filename),
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) {
        throw err
      } else {
        const text = data.slice(start, end || data.length)
        const tries = new WordTries(text, depth)
        callback(tries)
      }
    }
  )
}

module.exports = { readAndBuildTries }
