const fs = require('fs')
const path = require('path')
const util = require('util')
const WordTries = require('build-word-tries')

const promisifiedReadFile = util.promisify(fs.readFile)

async function readAndBuildTries(filename, start = 0, end = null, depth) {
  const file = await promisifiedReadFile(path.join(__dirname, filename), {
    encoding: 'utf-8',
  })

  const tries = new WordTries(file.slice(start, end || data.length), depth)
  return tries
}

async function createRoutesFromFile(file, app) {
  const tries = await readAndBuildTries(
    `./corpora/${file.filename}.txt`,
    file.start,
    file.end,
    1
  )

  app.use(`/api/corpus/${file.filename}/:word`, (req, res) => {
    const nextWords = tries.get(req.params.word)
    res.json(nextWords.slice(0, 3))
  })

  app.use(`/api/corpus/${file.filename}`, (req, res) => {
    res.json(tries.get().slice(0, 3))
  })
}

module.exports = { readAndBuildTries, createRoutesFromFile }
