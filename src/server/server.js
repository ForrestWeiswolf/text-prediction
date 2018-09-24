const express = require('express')
const { readAndBuildTries } = require('./fsUtils.js')
const list = require('./corpora/list.json')

const app = express()

function createRoutes(file) {
  readAndBuildTries(
    `./corpora/${file.name}.txt`,
    file.start,
    file.end,
    1,
    trie => {
      console.log(`Loaded ${file.name}`)

      app.use(`/api/corpora/${file.name}/:word`, (req, res) => {
        const nextWords = trie.get(req.params.word)
        res.json(nextWords.slice(0, 3))
      })

      app.use(`/api/corpora/${file.name}`, (req, res) => {
        res.json(trie.get().slice(0, 3))
      })
    }
  )
}

list.forEach(file => {
  createRoutes(file)
})

module.exports = app
