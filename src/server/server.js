const express = require('express')
const readAndBuildTries = require('./readAndBuildTries.js')

const app = express()

readAndBuildTries('/corpora/testfile.txt', 1, test => {
  console.log('Tries ready')
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
