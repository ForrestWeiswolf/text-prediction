const list = require('./list.json')
const { writeFile, readdir } = require('node:fs/promises')

const fetchCorpora = async () => {
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