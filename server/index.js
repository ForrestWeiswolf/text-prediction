const express = require('express')
const WordTries = require('build-word-tries')

const app = express()
const server = app.listen(8080, () => console.log(`Listening on port 8080`))

const str =
  '"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."'
const tries = new WordTries(str, 1)

app.use('/api/testText/:word', (req, res) => {
  if (req.params.word) {
    const nextWords = tries.get(req.params.word)
    res.json(nextWords)
  } else {
    res.json(test.get())
  }
})

module.exports = app
