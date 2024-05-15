const list = require('./src/server/corpora/list.json')
const { writeFile, readdir } = require('node:fs/promises')

const fetchCorpora = async () => {
  const corpora = await readdir('./src/server/corpora')

  console.log(corpora)
  list.forEach(async ({ source, filename }) => {
    if (!corpora.includes(`${filename}.txt`)) {
      console.log(`Fetching ${filename}`)
      const response = await fetch(source)
      writeFile(`./src/server/corpora/${filename}.txt`, response.body)
    }
  })
}

fetchCorpora()