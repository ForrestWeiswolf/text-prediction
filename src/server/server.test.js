const expect = require('chai').expect
const supertest = require('supertest')
const server = require('./index.js')

const agent = supertest.agent(server)

describe('server', () => {
  describe('GET /api/corpora', () => {
    it('sends a response', done => {})
  })
})
