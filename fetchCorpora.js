const list = require('./src/server/corpora/list.json')
const {writeFile} = require('node:fs/promises')

list.forEach(async ({source, filename}) => {
  const response = await fetch(source)
  writeFile(`./src/server/corpora/${filename}.txt`, response.body)
})