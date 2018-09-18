const express = require('express')
const { readAndBuildTries } = require('./fsUtils.js')

const app = express()

readAndBuildTries('/corpora/testfile.txt', 1, test => {
  console.log('Tries ready')

  app.use('/api/testfile/:word', (req, res) => {
    const nextWords = test.get(req.params.word)
    res.json(nextWords.slice(0, 3))
  })

  app.use('/api/testfile', (req, res) => {
    res.json(test.get().slice(0, 3))
  })
})

module.exports = app
