const express = require('express')
const { buildTriesFromFile } = require('./fsUtils.js')
const list = require('./list.json')
const fetchCorpora = require('./fetchCorpora')

const app = express()

fetchCorpora().then(() => {
  list.forEach(async corpus => {
    console.log('creating routes from', corpus.name)
    const tries = await buildTriesFromFile(corpus)

    app.use(`/api/corpus/${corpus.filename}/`, (req, res) => {
      let lastWords
      try {
        // http://localhost:8080/api/corpus/beowulf?words=[%22if%22,%22this%22]
        lastWords = req.query.words ? JSON.parse(req.query.words) : []
        console.log(lastWords)
        lastWords = lastWords.map(w => w.toLowerCase())
        let nextWords = tries.get(...lastWords)
        if (nextWords.length === 0) {
          nextWords = tries.get(lastWords[lastWords.length - 1])
        }
        res.json(nextWords.slice(0, 3))
      } catch (error) {
        console.error(error)
        res.end()
      }
    })
  })

  app.get('/api/corpora', (req, res) => {
    res.send(
      list.map(corpus => {
        return { name: corpus.name, route: corpus.filename }
      })
    )
  })
})

module.exports = app
