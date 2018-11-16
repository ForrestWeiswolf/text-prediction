const fs = require('fs')
const path = require('path')
const util = require('util')
const WordTries = require('build-word-tries')

const promisifiedReadFile = util.promisify(fs.readFile)

async function readAndBuildTries(filename, start = 0, end = null, depth) {
  const file = await promisifiedReadFile(path.join(__dirname, filename), {
    encoding: 'utf-8',
  })

  const tries = new WordTries(file.slice(start, end || file.length), depth)
  return tries
}

async function createRoutesFromFile(file, app) {
  const tries = await readAndBuildTries(
    `./corpora/${file.filename}.txt`,
    file.start,
    file.end,
    2
  )

  app.use(`/api/corpus/${file.filename}/`, (req, res) => {
    let lastWords
    try {
      lastWords = req.query.words ? JSON.parse(req.query.words) : []
      const nextWords = tries.get(...lastWords)
      res.json(nextWords.slice(0, 3))
    } catch (error) {
      console.error(error)
      res.end()
    }
  })
}

module.exports = { readAndBuildTries, createRoutesFromFile }
