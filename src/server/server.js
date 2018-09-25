const express = require('express')
const { createRoutesFromFile } = require('./fsUtils.js')
const list = require('./corpora/list.json')

const app = express()

list.forEach(file => {
  createRoutesFromFile(file, app)
})

module.exports = app
