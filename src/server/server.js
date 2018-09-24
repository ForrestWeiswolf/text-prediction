const express = require('express')
const { readAndBuildTries } = require('./fsUtils.js')

const app = express()

const testFile = {
  name: 'testfile',
  location: '/corpora/testfile.txt',
  start: 24,
  end: null
}

function createRoutes(file){
  readAndBuildTries(file.location, file.start, file.end, 1, trie => {
    console.log(`Loaded ${file.name}`)

    app.use(`/api/corpora/${file.name}/:word`, (req, res) => {
      const nextWords = trie.get(req.params.word)
      res.json(nextWords.slice(0, 3))
    })
  
    app.use(`/api/corpora/${file.name}`, (req, res) => {
      res.json(trie.get().slice(0, 3))
    })  
  })
}

createRoutes(testFile)

module.exports = app
