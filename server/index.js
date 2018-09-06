const express = require('express')

const app = express()
const server = app.listen(8080, () => console.log(`Listening on port 8080`))

app.use('/test', (req, res) => {
  res.json({test: 'this is a test'})
})

module.exports = app
