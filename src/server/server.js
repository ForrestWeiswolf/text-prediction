const express = require('express')
const { createRoutesFromFile } = require('./fsUtils.js')
const list = require('./corpora/list.json')

const app = express()

list.forEach(file => {
  createRoutesFromFile(file, app)
})

app.get('/api/corpora', (req, res) => {
  res.send(list.map(file => file.name))
})

module.exports = app
