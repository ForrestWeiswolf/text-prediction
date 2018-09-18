const fs = require('fs')
const path = require('path')
const WordTries = require('build-word-tries')

function readAndBuildTries(filename, depth, callback) {
  fs.readFile(
    path.join(__dirname, filename),
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) {
        throw err
      } else {
        const tries = new WordTries(data, depth)
        callback(tries)
      }
    }
  )
}

module.exports = { readAndBuildTries }
