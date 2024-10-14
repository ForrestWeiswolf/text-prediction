const fs = require('fs')
const path = require('path')
const util = require('util')
const WordTries = require('build-word-tries')

const DEPTH = 2

const corporaPath = path.join(__dirname, '/corpora')

const promisifiedReadFile = util.promisify(fs.readFile)

async function buildTriesFromFile(corpus) {
  const filePath = path.join(corporaPath, `/${corpus.filename}.txt`)
  const file = await promisifiedReadFile(filePath, {
    encoding: 'utf-8',
  })

  console.log('creating tries')
  const tries = new WordTries(file.slice(corpus.start || 0, corpus.end || file.length), DEPTH)
  console.log(`loaded ${corpus.filename}`)

  return tries
}

module.exports = { buildTriesFromFile }
