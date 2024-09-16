const list = require('./list.json')
const { writeFile, readdir, mkdir } = require('node:fs/promises')

const fetchCorpora = async () => {
  try {
    await mkdir('./corpora')
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  const corpora = await readdir('./corpora')

  console.log(corpora)
  list.forEach(async ({ source, filename }) => {
    if (!corpora.includes(`${filename}.txt`)) {
      console.log(`Fetching ${filename}`)
      const response = await fetch(source)
      writeFile(`./corpora/${filename}.txt`, response.body)
    }
  })
}

fetchCorpora()