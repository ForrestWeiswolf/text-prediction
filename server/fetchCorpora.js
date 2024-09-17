const list = require('./list.json')
const { writeFile, readdir, mkdir } = require('node:fs/promises')

const fetchCorpora = async () => {
  try {
    await mkdir(`${process.env.CORPUS_DIR}/corpora`)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  const corpora = await readdir(`${process.env.CORPUS_DIR}/corpora`)

  console.log(corpora)
  list.forEach(async ({ source, filename }) => {
    if (!corpora.includes(`${filename}.txt`)) {
      console.log(`Fetching ${filename}`)
      const response = await fetch(source)
      writeFile(`${process.env.CORPUS_DIR}/corpora/${filename}.txt`, response.body)
    }
  })
}

export default fetchCorpora