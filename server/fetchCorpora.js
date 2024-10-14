const list = require('./list.json')
const { writeFile, readdir, mkdir } = require('node:fs/promises')
const path = require('path');

const corporaPath = path.join(__dirname, '/corpora')

const fetchCorpora = async () => {
  try {
    await mkdir(corporaPath)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  const corpora = await readdir(corporaPath)

  console.log(corpora)
  list.forEach(async ({ source, filename }) => {
    if (!corpora.includes(`${filename}.txt`)) {
      console.log(`Fetching ${filename}`)
      const response = await fetch(source)
      writeFile(path.join(corporaPath, `${filename}.txt`), response.body)
    }
  })
}

fetchCorpora()