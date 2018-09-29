const express = require('express')
const { createRoutesFromFile } = require('./fsUtils.js')
const list = require('./corpora/list.json')

const app = express()

list.forEach(file => {
  createRoutesFromFile(file, app)
})

app.get('/api/corpora', (req, res) => {
  res.send(
    list.map(file => {
      return { name: file.name, route: file.filename }
    })
  )
})

module.exports = app
