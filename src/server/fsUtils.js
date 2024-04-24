const fs = require('fs')
const path = require('path')
const util = require('util')
const WordTries = require('build-word-tries')

const DEPTH = 2

const promisifiedReadFile = util.promisify(fs.readFile)

async function buildTriesFromFile(corpus) {
  const filePath = `./corpora/${corpus.filename}.txt`
  const file = await promisifiedReadFile(path.join(__dirname, filePath), {
    encoding: 'utf-8',
  })

  console.log('creating tries')
  const tries = new WordTries(file.slice(corpus.start || 0, corpus.end || file.length), DEPTH)
  console.log(`loaded ${corpus.filename}`)

  return tries
}

module.exports = { buildTriesFromFile }
