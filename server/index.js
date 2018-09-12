const express = require('express')
const fs = require('fs')
const path = require('path')
const WordTries = require('build-word-tries')

const app = express()
const server = app.listen(8080, () => console.log(`Listening on port 8080`))

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

readAndBuildTries('/corpora/testfile.txt', 1, test => {
  app.use('/api/testfile/:word', (req, res) => {
    if (req.params.word) {
      const nextWords = test.get(req.params.word)
      res.json(nextWords)
    } else {
      res.json(test.get())
    }
  })
})

module.exports = app
