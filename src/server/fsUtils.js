const fs = require('fs')
const path = require('path')
const WordTries = require('build-word-tries')

function readAndBuildTries(filename, start = 0, end = null, depth, callback) {
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

function createRoutesFromFile(file, app) {
  readAndBuildTries(
    `./corpora/${file.name}.txt`,
    file.start,
    file.end,
    1,
    trie => {
      console.log(`Loaded ${file.name}`)

      app.use(`/api/corpus/${file.name}/:word`, (req, res) => {
        const nextWords = trie.get(req.params.word)
        res.json(nextWords.slice(0, 3))
      })

      app.use(`/api/corpus/${file.name}`, (req, res) => {
        res.json(trie.get().slice(0, 3))
      })
    }
  )
}

module.exports = { readAndBuildTries, createRoutesFromFile }
