const list = require('./list.json')
const { writeFileSync, readdirSync, mkdirSync } = require('fs')

const fetchCorpora = () => {
  try {
   mkdirSync(`${process.env.CORPUS_DIR}/corpora`)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  const corpora = readdirSync(`${process.env.CORPUS_DIR}/corpora`)

  console.log(corpora)
  list.forEach(async ({ source, filename }) => {
    if (!corpora.includes(`${filename}.txt`)) {
      console.log(`Fetching ${filename}`)
      const response = fetch(source)
      writeFileSync(`${process.env.CORPUS_DIR}/corpora/${filename}.txt`, response.body)
    }
  })
}

export default fetchCorpora